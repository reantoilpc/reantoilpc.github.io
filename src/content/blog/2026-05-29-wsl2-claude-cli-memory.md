---
title: WSL2 + Claude CLI 記憶體越用越多最後當機 — 完整除錯與解法
description: ""
pubDate: 2026-05-29
tags: [wsl2, claude-code, debug, windows, memory]
lang: zh-TW
---

## TL;DR

在 Windows 11 用 WSL2 Ubuntu 跑 Claude CLI，Task Manager 看到 `VmmemWSL` 一路漲、最後整機卡死。**真正根因**不是 Claude CLI 漏記憶體，而是三件事疊加：

1. 舊的 `claude --resume` session 沒關，殘留在背景吃記憶體
2. 每個 session 都會起一組 MCP server（Azure / Atlassian / …），數量乘以 session 數
3. **沒設 `.wslconfig`**，WSL2 既沒有 memory cap，也沒開 `autoMemoryReclaim`，閒置 RAM 不會還給 Windows

**解法**：殺殘留 session → `wsl --shutdown` → 建 `.wslconfig`（memory cap + `autoMemoryReclaim=gradual` + `sparseVhd=true`）。

## 1. 問題現象

| 現象 | 數據 |
|---|---|
| Windows 整機記憶體 | **89%** 已用 |
| VmmemWSL（WSL2 VM process） | 2,627 MB |
| WSL 越用越多，最後當掉 | OOM killer 殺進程 + Windows 自己 swap |

Windows Task Manager 記憶體分佈：

```text
VmmemWSL              2,627.9 MB
Google Chrome (13)      832.1 MB
JetBrains Rider         758.3 MB
Microsoft Teams (10)    549.3 MB
遠端桌面連線            317.8 MB
JetBrains Rider.Backend 289.3 MB
Google Chrome           272.1 MB
Postman (5)             251.4 MB
```

---

## 2. 排查：先看 WSL 內部實況

```bash
$ free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi       3.1Gi        11Gi       114Mi       759Mi        12Gi
Swap:          4.0Gi          0B       4.0Gi
```

關鍵觀察：

- `Mem total = 15Gi` → **WSL 看得到主機全部 RAM**，代表沒設 memory cap
- `buff/cache = 759 MB` → 不是 page cache 漲爆
- `used 3.1 Gi` 對得上 Windows 端看到的 `VmmemWSL 2.6 GB`

確認沒有 `.wslconfig`：

```bash
$ ls /mnt/c/Users/rayhsu/.wslconfig
ls: cannot access '/mnt/c/Users/rayhsu/.wslconfig': No such file or directory
```

---

## 3. 證明：找出誰在吃記憶體

```bash
$ ps aux --sort=-%mem | head -10
USER     PID %CPU %MEM     VSZ    RSS TTY STAT START   TIME COMMAND
rayhsu  3262  0.8  4.5 7490M   738M pts/4 Sl+ May28  7:24 claude --resume --effort=max
rayhsu  2055  0.7  4.1 7490M   671M pts/3 Sl+ May28  7:02 claude --resume --effort=max
rayhsu  2405  0.6  3.4 7483M   556M pts/2 Sl+ May28  5:28 claude --resume --effort=max
rayhsu 67652  3.7  2.6 7624M   431M pts/5 Sl+ 09:12  0:56 claude --resume xxxx
rayhsu  3455  0.0  0.8 3645M   138M pts/4 Sl+ May28  0:27 azmcp server start ...
rayhsu  2599  0.0  0.8 3644M   135M pts/2 Sl+ May28  0:28 azmcp server start ...
rayhsu  2247  0.0  0.8 3644M   132M pts/3 Sl+ May28  0:28 azmcp server start ...
```

**找到了**：

- **4 個並行的 `claude --resume` session**，三個是昨天（`May28`）開的沒關 → RSS 加總 ~2.4 GB
- **每個 session 各自起一組 MCP server**（`azmcp` ~130 MB + npm wrapper ~90 MB = ~220 MB），4 組 × 220 MB ≈ ~880 MB
- VSZ 巨大（7.4 GB）是 Node.js V8 預留的 virtual address space，**不代表實際使用**；看 RSS 才是真實

---

## 4. 三個放大記憶體的根因

### A. 殘留的 claude session

Claude CLI 是 Node.js 寫的，**長時間運行的 session 會緩慢長 heap**：

- conversation transcript 留在記憶體
- tool result buffer（讀進來的檔案、圖片）累積
- 即使 session 自動 compact，process heap 也不會立刻釋放

→ **`/exit` 才算真的關閉**；關掉終端機視窗如果是 detached 模式 process 還在。

### B. 每個 session 都吊一組 MCP server

MCP server 是 `claude` 的 subprocess，**claude 死了它才會死**。所以：

```text
N 個 claude session × M 個 MCP server = N × M 個 Node process
```

我這台同時掛 4 個 session，每個都起 Azure MCP（即使這個專案根本沒用到 Azure）→ 浪費 ~880 MB。

### C. WSL2 沒 memory cap、不主動回收

Windows 11 上 WSL2 預設 `memory = 主機全部 RAM`，再加上 **Hyper-V 不會主動把閒置記憶體還給 Windows**（dynamic memory 是針對 Linux kernel 看不到的層級）。結果：

> **WSL 記憶體峰值會留住，下不來 → Windows 越來越緊**

這就是「越用越多」感覺的物理機制。

---

## 5. 為什麼會「當掉」

兩條路徑：

```text
路徑 1（WSL 內爆）：
  WSL anon memory ↗ → 接近 cap → Linux OOM killer 殺進程
                                   └─ claude / mcp / build 突然消失

路徑 2（Windows 整機爆）：
  VmmemWSL 持續高水位 + Chrome/Rider/Teams 一起吃
  → Windows 開始 swap → 整機 freeze 感
```

兩條路徑都會體感「當機」，但**原因不同、徵兆不同**。

---

## 6. 解法

### 步驟 1：先殺殘留 session（立刻見效）

```bash
# 看誰是舊的（從昨天留下來的）
ps -ef | grep "claude --resume" | grep -v grep

# 留新的，殺舊的（你的 PID 會不同）
kill 2055 2405 3262
```

→ 立刻釋放約 2 GB（claude 本身 + 跟它跑的 MCP server）。

### 步驟 2：`wsl --shutdown` 讓 Windows 收回記憶體

在 **PowerShell**（不是 WSL 視窗）：

```powershell
wsl --shutdown
```

> 注意：這會關掉所有 WSL 視窗。下次 `wsl` 進來時記憶體歸零、`VmmemWSL` 從 0 開始計。

### 步驟 3：建 `.wslconfig` 治本

放在 **Windows 端**（不是 Linux 裡）：

```text
C:\Users\<user>\.wslconfig
```

從 WSL 端寫等同寫到 `/mnt/c/Users/<user>/.wslconfig`，是同一個檔。

完整內容：

```ini
# WSL2 global config. Applies to all distros. Edit + `wsl --shutdown` to reload.

[wsl2]
# Cap WSL memory at 8GB (host has 16GB; leaves room for Windows + Rider + Chrome + Teams).
memory=8GB

# Swap inside the WSL VM. Acts as a safety net before OOM killer fires.
swap=4GB

# CPU cores given to WSL (host has 20). 8 is plenty for parallel claude sessions
# without starving Windows-side IDE / browser.
processors=8

# Default true on Win11, but explicit beats implicit when you debug later.
localhostForwarding=true

[experimental]
# Auto-release freed memory back to Windows. Without this, VmmemWSL keeps the
# high-water mark forever — the root cause of "WSL grows but never shrinks".
# Options: disabled | gradual | dropcache. `gradual` is the safe default.
autoMemoryReclaim=gradual

# Shrink the ext4 vhdx on file delete (otherwise it grows monotonically).
sparseVhd=true
```

> 編輯後一定要 `wsl --shutdown` 才會重新讀取。

---

## 7. `.wslconfig` 各 key 在幹什麼

### `[wsl2]` section

| Key | 作用 | 不設的後果 |
|---|---|---|
| `memory=8GB` | WSL VM 記憶體上限 | Win11 預設 = 主機全部 RAM，會把 Windows 擠爆 |
| `swap=4GB` | WSL VM 內 swap 大小 | 預設 = 25% RAM；設 0 = 沒安全網，一爆 cap 直接 OOM kill |
| `processors=8` | WSL 看到幾顆 vCPU | 預設 = 主機全部核心，build 跑滿時拖到 Windows |
| `localhostForwarding=true` | WSL 服務 listen 在 0.0.0.0 → Windows `localhost:port` 可連 | Win11 預設 true；寫上方便除錯 |

### `[experimental]` section（要分開放）

| Key | 作用 | 不設的後果 |
|---|---|---|
| `autoMemoryReclaim=gradual` | Linux 釋放 page 後逐步把 RAM 還給 Windows | VmmemWSL 永遠停在歷史高水位 |
| `sparseVhd=true` | ext4 vhdx 變 sparse 格式，刪檔可縮 | vhdx 只長不縮，磁碟用久越腫 |

`autoMemoryReclaim` 三個選項：

- `disabled`：不還（舊預設）
- `gradual`：慢慢還，保留 page cache（**推薦**）
- `dropcache`：激進還，連 page cache 也丟，下次讀檔要重抓 disk

---

## 8. 踩到的坑 — 放錯 section 會被忽略

第一次設定我把 `autoMemoryReclaim` 跟 `sparseVhd` 放在 `[wsl2]` 底下，重啟 WSL 時 PowerShell 印：

```text
wsl: wsl2.autoMemoryReclaim:C:\Users\rayhsu\.wslconfig 中不明的按鍵 '17'
wsl: wsl2.sparseVhd:C:\Users\rayhsu\.wslconfig 中不明的按鍵 '20'
```

訊息拆解：

- `wsl2.autoMemoryReclaim` → 在 `[wsl2]` section 找這個 key
- `中不明的按鍵` → 中文翻譯怪：意思是「不認得這個 key」（key 被翻成「按鍵」）
- `'17'` / `'20'` → **是 `.wslconfig` 的行號**，剛好對到那兩行

**修正**：把這兩個 key 移到 `[experimental]` section。

```diff
 [wsl2]
 memory=8GB
 swap=4GB
 processors=8
 localhostForwarding=true
-autoMemoryReclaim=gradual
-sparseVhd=true
+
+[experimental]
+autoMemoryReclaim=gradual
+sparseVhd=true
```

> 這兩個功能在 WSL 還屬於「實驗性」，Microsoft 要求放 `[experimental]` 底下。

---

## 9. `.wslconfig` 放在哪？兩個概念分清楚

| 檔案 | 位置 | 何時讀 | 範圍 |
|---|---|---|---|
| **`.wslconfig`** | Windows `%UserProfile%\.wslconfig`（= `C:\Users\<user>\.wslconfig`） | Linux VM **啟動前**，由 Windows 上的 WSL 服務讀 | 全域（所有 distro） |
| **`/etc/wsl.conf`** | Linux 內 `/etc/wsl.conf` | Linux 已經開機後 | 該 distro 限定 |

`memory=8GB` 這種設定是「**Hyper-V 要分配給 VM 多少資源**」 → Linux 還沒開機之前 Windows 就要決定 → 必須在 Windows host 上。

**從 WSL 寫和從 Windows 寫是同一個檔**：

```text
Windows: C:\Users\rayhsu\.wslconfig          ┐
                                              ├─ 同一個檔案，兩個視角
WSL:     /mnt/c/Users/rayhsu/.wslconfig      ┘
```

`/mnt/c/` 是 WSL 自動掛載的 Windows C 槽橋接點。

---

## 10. 驗證清單

### 不用重啟就能驗

```bash
# A. 檔案有沒有寫對
cat /mnt/c/Users/<user>/.wslconfig

# B. memory cap 有沒有吃到（找 Mem total 應該 ~7.8 Gi）
free -h

# C. processors cap 有沒有吃到（應該 = 8）
nproc

# D. ini 語法自驗（Python configparser）
python3 -c "
import configparser
c = configparser.ConfigParser()
c.read('/mnt/c/Users/<user>/.wslconfig')
for s in c.sections():
    print(f'[{s}]')
    for k, v in c.items(s):
        print(f'  {k} = {v}')
"
```

### 需要 `wsl --shutdown` 重啟後才能驗

```bash
# E. [experimental] section 有沒有被認得（重點）
#    重啟後 PowerShell 跑 wsl 進來，不應該再印「不明的按鍵」warning
wsl.exe -e true 2>&1
# 預期輸出：空白
```

```powershell
# F. sparseVhd 有沒有真的 sparse
#    比較 Windows 端 vhdx 實體大小 vs Linux 內部 used
Get-ChildItem 'C:\Users\<user>\AppData\Local\wsl\<guid>\ext4.vhdx' |
    Select-Object Name, @{N='GB';E={[math]::Round($_.Length/1GB,2)}}
```

```text
# G. autoMemoryReclaim 行為
#    跑一波吃 RAM 的工作後，過 5~10 分鐘，Windows Task Manager 看 VmmemWSL 應緩降
#    （無法瞬間驗，要實際 workload）
```

### 實際驗證結果

| # | 檢查 | 結果 |
|---|---|---|
| A | `.wslconfig` 內容、行數 | ✓ 879 bytes |
| B | `Mem total = 7.8 Gi` | ✓ |
| C | `nproc = 8` | ✓ |
| D | ini 自驗：兩個 section + 6 個 key 全 parse 通過 | ✓ |
| **E** | **`wsl.exe -e true` stderr 完全空白** | ✓✓（最關鍵） |
| F | Linux used 31 GB vs vhdx 35.16 GB（差 4 GB metadata） | ✓ |
| G | autoMemoryReclaim 行為 | ⏳ 待後續觀察 |

---

## 11. 心智模型

```text
Windows 16GB RAM
       │
       ├── Windows + Chrome + Rider + Teams …  (~5~7 GB)
       │
       └── WSL2 VM (cap = 8GB) ─┐
                  │             ├ Linux kernel ~400 MB
                  │             ├ claude session A (~700 MB)
                  │             ├ claude session B (~500 MB)
                  │             ├ MCP servers (~200 MB × N)
                  │             ├ bun dev / build
                  │             └ swap (4GB, vhdx in %TEMP%)
                  │
                  └─[gradual reclaim]→ 閒置時慢慢歸還
```

**沒設這份 config 之前**：最後那條 reclaim 箭頭不存在 → 高水位永遠不下來，這就是 89% 的成因。

---

## 12. 養成的好習慣

- 用完 `/exit` 收掉 claude session，不要把終端機留著
- 不要 4 個 session 同時開 `--effort=max`；max 模式吃 CPU 又拖長 session 自然吃更多 heap
- 不用的 MCP server 在 `~/.claude.json` 或專案 `settings.json` 裡關掉（Azure MCP 在非 Azure 專案就關）
- 定期 `wsl --shutdown` 重置 VM
- Windows Task Manager 釘住「記憶體」欄位排序，VmmemWSL 飆超過 cap 一半就該收 session 了

---

## 13. 補充：常用診斷指令

```bash
# 看哪個 process 吃最多記憶體
ps aux --sort=-%mem | head -10

# 看所有 claude 進程 + RSS 加總
ps -o rss= -C claude | awk '{sum+=$1} END {printf "%.0f MB across %d procs\n", sum/1024, NR}'

# 看 VM uptime（確認是新啟動的 VM 還是舊的）
uptime

# 找 vhdx 實體位置
find /mnt/c/Users/<user>/AppData/Local -maxdepth 5 -name "ext4.vhdx" 2>/dev/null

# WSL 版本（autoMemoryReclaim 需要 0.66.1+，sparseVhd 需要 1.0+）
wsl.exe --version
```

```powershell
# Windows 端：強制重置 WSL VM（釋放 VmmemWSL 回 Windows）
wsl --shutdown

# 看目前哪些 distro 在跑
wsl --list --running
```

---

## 14. 參考資料

- [WSL `.wslconfig` 官方文件](https://learn.microsoft.com/zh-tw/windows/wsl/wsl-config)
- [`autoMemoryReclaim` 發布筆記（WSL 0.66.1）](https://github.com/microsoft/WSL/releases)
- [Sparse VHD support in WSL](https://learn.microsoft.com/zh-tw/windows/wsl/disk-space)

---

## 附錄：本部落格發文流程備忘（給未來的我）

這個 blog 是 Docusaurus 2.0.0-beta.14（2021 年）+ GitHub Pages，source repo 跟 deploy repo 分開：

- **Source**：[`reantoilpc/docusaurus_websit`](https://github.com/reantoilpc/docusaurus_websit) — 寫 markdown 的地方
- **Deploy 產出**：[`reantoilpc/reantoilpc.github.io`](https://github.com/reantoilpc/reantoilpc.github.io) — 編譯後靜態檔案

原本 CI（`.github/workflows/publish-blog.yml`）會在 push 到 main 後自動 build + deploy，但 **CI 目前壞掉**（後面會解釋），所以暫時用「本機 build + deploy」繞過。

### 標準發文流程（CI 壞掉期間）

```bash
cd ~/projects/Github/docusaurus_websit

# 1. 寫新文章
# 檔名格式：blog/YYYY-MM-DD-slug.md
# frontmatter 範本：
# ---
# slug: YYYY-MM-DD-slug
# title: 文章標題
# authors: rayhsu
# tags: [tag1, tag2]
# ---

# 2. commit source
git add blog/<新檔>.md
git commit -m "<簡短中文敘述>"
git push origin main

# 3. 本機 build & deploy（繞 CI）
GIT_USER=reantoilpc DEPLOYMENT_BRANCH=main USE_SSH=false npx docusaurus deploy

# 4. 等 GitHub Pages CDN propagate（30~60 秒）
curl -sI https://reantoilpc.github.io/blog/YYYY-MM-DD-slug/ | head -1
# 預期：HTTP/2 200
```

### CI 為什麼壞掉

問題在 `package.json` 用 caret ranges（`^2.0.0-beta.14`）+ **repo 沒 yarn.lock**：

1. CI 跑 `yarn install` 每次都抓最新 transitive deps
2. 套件升版後跟 Docusaurus 2021 年的版本飄走，build 工具鏈（webpack ProgressPlugin、node-releases…）API mismatch
3. 連續兩次 fail：
   - 第一次：`node-releases@2.0.46` 要求 Node ≥18，CI 跑 Node 14 → 已修（bump 到 Node 18）
   - 第二次：webpack ProgressPlugin schema 不認得 `name` / `color` / `reporters` 屬性 → 沒修

本機之所以能 build，是因為 `node_modules/` 被 commit 在 repo 裡（290 MB），webpack 鎖在相容的 5.67.0。

### 之後想根治 CI 的三條路

| 路線 | 動作 | 風險 |
|---|---|---|
| (a) 用既有 node_modules 生 yarn.lock | `yarn import` 從 `package-lock.json` 轉、或 `synp` 工具 | 中（要驗轉換正確性） |
| (b) workflow 改用 `npm ci` + 既有 `package-lock.json` | 改一行 + lockfile 也老，可能還要鎖 webpack `resolutions` | 中（package-lock.json 也是 4 年前） |
| (c) 升級到 Docusaurus 3 | 大改，可能撞 mdx 語法、theme override、React 17→18 等 | 高 |

目前 trade-off：每篇文章手動跑一次 `npx docusaurus deploy` 不算慢（本機既有 node_modules，build 約 20 秒），治本工程量大，等下次想動再說。

### 環境檢查清單

換新電腦 / 重 clone 後要先確認本機能 build：

```bash
cd ~/projects/Github/docusaurus_websit
# node_modules 應該已經 commit 進 repo（290 MB）
ls node_modules/webpack/package.json && cat node_modules/webpack/package.json | grep version
# 預期 "version": "5.67.0"

# 試一次 build 不 deploy
npx docusaurus build
# 預期：Generated static files in build. (+ build/en/)
```

如果 build 過了就放心。Deploy 走 `USE_SSH=false` 用 HTTPS + `gh auth` 既有憑證，不需要額外 SSH key。

---

*記錄日期：2026-05-29 / 環境：Windows 11 build 26200, WSL 2.6.3.0, Ubuntu 24.04*

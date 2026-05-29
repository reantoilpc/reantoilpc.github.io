# 設計規格：個人網站改版 — Docusaurus → Astro

- **日期**：2026-05-29
- **作者**：Ray Hsu (reantoilpc)
- **狀態**：草案，待 review

## 1. 目標

把目前用 **Docusaurus 2.0.0-beta.14** 架的個人技術站「RH工作筆記」，改版成一個**現代、好看、效能/SEO 佳、長期好維護**的個人網站，並**完整遷移既有文章與筆記**，網址維持在 `https://reantoilpc.github.io`。

使用者不寫前端，網站由 AI 實作；維護目標是「**寫新文章 = 新增一個 Markdown 檔並 push，其餘全自動**」。

## 2. 現況分析

### 2.1 內容
- **部落格**：13 篇 Markdown，其中 **9 篇是真實文章**（作者 rayhsu，全繁中，主題為 .NET / EF Core / K8s / WSL2 等），4 篇是 Docusaurus 預設範例文。
- **Notes 知識庫**（`docs/`）：**4 篇真實筆記**（Dotnet、Git、PowerShell、Shortcut）＋ `intro.md`，其餘為 Docusaurus 教學範例。
- **圖片**：放在 `blog/pictures/<日期>/*.png`。
- **i18n**：`docusaurus.config.js` 設定了 `zh-TW`（預設）與 `en`，但**沒有 `i18n/` 資料夾，英文實際上零內容**。

### 2.2 部署架構（重要）
- 原始碼在 **`github.com/reantoilpc/docusaurus_websit`**（main）。
- 該 repo 的 GitHub Actions `publish-blog.yml` 建置後，把成品推到 **`github.com/reantoilpc/reantoilpc.github.io`**（main）。
- GitHub Pages 從 `reantoilpc.github.io` 的 main 服務（user site）。

→ 改版後**必須停用 `docusaurus_websit` 的 `publish-blog.yml`**，否則它會持續把舊 Docusaurus 站覆蓋回 `reantoilpc.github.io`。

## 3. 技術選型

| 項目 | 選擇 | 理由 |
|---|---|---|
| 框架 | **Astro（最新穩定版）** | 內容型網站社群首選；預設 0 JS、效能/SEO 佳；Markdown/MDX 原生；好維護 |
| 語言/樣式 | TypeScript + **Tailwind CSS** | 維護一致、樣式可控 |
| 內容管理 | Astro **Content Collections**（型別安全 frontmatter） | 文章用 `.md`/`.mdx`，schema 驗證 |
| 程式碼區塊 | **Expressive Code**（或 Shiki） | 文章程式碼多（C#/bash/PowerShell），需語法高亮＋複製鈕 |
| 站內搜尋 | **Pagefind** | 純靜態、零後端，建置時產生索引，零維護 |
| i18n | Astro 原生 i18n | 介面雙語＋ `hreflang` |
| 部署 | **GitHub Pages（GitHub Actions 部署）** | 沿用現有網址、免費、自動化 |

技術細節（框架實作）由 AI 負責，使用者無需理解。

## 4. 網站架構

### 4.1 頁面與路由
| 頁面 | 路徑 | 說明 |
|---|---|---|
| 首頁 | `/` | 個人簡介 + 最新文章 + （可選）精選筆記 |
| 部落格列表 | `/blog` | 依日期排序、可依標籤過濾 |
| 文章內頁 | `/blog/<原 slug>` | **逐篇沿用既有 slug，網址不變** |
| 筆記庫 | `/notes`、`/notes/<分類>/<頁>` | 側邊欄分類（Dotnet/Git/PowerShell/Shortcut） |
| 關於 | `/about` | 個人介紹 |
| 標籤 | `/tags`、`/tags/<tag>` | 標籤索引 |
| 英文版 | `/en/...` | 介面英文；文章依語言顯示 |

**不做**：作品集 / projects 頁（使用者明確表示不需要）。

### 4.2 i18n 模式（已與使用者確認）
- 預設語系 **`zh-TW`（無路徑前綴）**，次要 **`en`（`/en/` 前綴）**；右上角語言切換器。
- **介面（選單、頁尾、標籤等 UI 字串）雙語**；**文章用其原本語言撰寫即可，不強制翻譯**。
- 所有既有文章以 `zh-TW` 遷入。每篇 frontmatter 標記 `lang`，列表依當前語系過濾。
- 輸出 `hreflang` 標記，對 SEO 友善。

### 4.3 網站品牌與標題

- **網站名稱**：**Ray Hsu**（本名品牌）。
- **Tagline**：
  - 繁中：C# 後端工程師・開發筆記
  - English：Backend engineer · dev notes
- 套用於 navbar 標題、首頁 hero、`<title>` / OG metadata 與 RSS 標題。

## 5. 外觀設計方向（使用者授權由 AI 決定）

- **乾淨、現代、以閱讀排版為核心**：充足留白、單一強調色、清楚的標題層級。
- **亮 / 暗模式**切換，記住偏好。
- 針對**繁體中文易讀性**選用合適字型堆疊（避免額外大字型造成效能負擔，優先系統字型或子集化）。
- **程式碼區塊**為一級體驗：語法高亮、檔名標題、複製鈕、適合長程式碼閱讀。
- 實作策略：**先做出可運作的預覽**（首頁＋一篇遷移後的文章），交由使用者回饋後再微調，而非一次定稿。

## 6. 功能清單

- 亮/暗模式
- 標籤系統（列表、單一標籤頁）
- 閱讀時間估計
- **站內搜尋（Pagefind）**
- **RSS feed**（`/rss.xml`）
- **sitemap.xml**（自動）
- 社群分享 **OG image**（每篇自動產生或預設圖）
- 程式碼語法高亮＋複製
- 響應式（手機/桌面）

## 7. 內容遷移計畫

### 7.1 部落格文章（保留 9 篇，網址不變）
| 原始檔 | slug（沿用） | 新網址 |
|---|---|---|
| 2022-05-31-postman-set-environment-variable.md | `postman-environment-variable` | `/blog/postman-environment-variable` |
| 2022-07-21-nuget-package-Enums.NET.md | `2022-07-21-nuget-package-Enums.NET` | `/blog/2022-07-21-nuget-package-Enums.NET` |
| 2022-08-02-global-produces-attribute.md | `2022-08-02-global-produces-attribute` | `/blog/2022-08-02-global-produces-attribute` |
| 2022-08-17-efcore-guide.md | `2022-08-17-efcore-guide` | `/blog/2022-08-17-efcore-guide` |
| 2022-11-02-github-unitofwork.md | `2022-11-02-github-unitofwork` | `/blog/2022-11-02-github-unitofwork`（內容近空白，遷移後可補寫） |
| 2022-12-29-miniProfiler-guide.md | `2022-12-29-miniProfiler-guide` | `/blog/2022-12-29-miniProfiler-guide` |
| 2023-02-22-Create-Multiple-Project-Template.md | `2023-02-22-Create-Multiple-Project-Template` | `/blog/2023-02-22-Create-Multiple-Project-Template` |
| 2023-03-25-lens-with-k8s.md | `2023-03-25-lens-with-k8s` | `/blog/2023-03-25-lens-with-k8s` |
| 2026-05-29-wsl2-claude-cli-memory.md | `2026-05-29-wsl2-claude-cli-memory` | `/blog/2026-05-29-wsl2-claude-cli-memory` |

**丟棄**（Docusaurus 範例文）：first-blog-post、long-blog-post、mdx-blog-post、welcome。

### 7.2 Frontmatter 轉換
- Docusaurus 欄位 `slug` / `title` / `authors` / `tags` → Astro content collection schema。
- 日期：由檔名 `YYYY-MM-DD-` 取得 → `pubDate`。
- 作者：統一為 `rayhsu`（Ray Hsu，C# 後端工程師）；丟棄 Docusaurus 範例作者。
- 新增 `lang: zh-TW`。

### 7.3 圖片
- 從 `blog/pictures/<日期>/` 搬入 Astro 資產目錄，修正文章內引用路徑，套用 Astro 圖片優化。

### 7.4 Notes 知識庫
- 遷入 4 篇真實筆記＋分類：Dotnet / Git / PowerShell / Shortcut。
- **丟棄** Docusaurus 教學範例（tutorial-basics、tutorial-extras）。
- 舊 `/docs/...` 網址 → 新 `/notes/...`；為這幾頁加 **301/redirect**（數量少，避免 SEO 斷鏈）。

## 8. Repo 與部署架構

1. **備份**：把 `reantoilpc.github.io` 目前 main（舊 Docusaurus 成品）保存到備份分支（如 `legacy-docusaurus-build`）或 tag。
2. **新原始碼進駐**：在 `reantoilpc.github.io` repo 的 main 放 **Astro 原始碼**（取代原本的成品檔）。
3. **GitHub Actions**：於 `reantoilpc.github.io` 新增 workflow，push 時建置 Astro 並以 `actions/deploy-pages` 部署到 Pages。
4. **Pages 設定**：將 GitHub Pages 來源切換為「**GitHub Actions**」（此步驟需在 repo Settings → Pages 由使用者操作，會提供指引）。
5. **停用舊流程**：停用/刪除 `docusaurus_websit` 的 `publish-blog.yml`，避免覆蓋新站。
6. **保留 `docusaurus_websit`** 作為遷移內容來源與封存，不刪除。

## 9. SEO 與網址保留

- 部落格文章網址**完全不變**（逐篇沿用 slug）。
- 預設語系 `zh-TW` **不加路徑前綴**，維持既有 `/blog/...` 結構。
- 產生 `sitemap.xml`、`rss.xml`、`hreflang`、OG meta。
- Notes 由 `/docs/` 改 `/notes/` 的少數頁面加 redirect。

## 10. 不做的範圍（YAGNI）

- ❌ 作品集 / projects 頁
- ❌ 文章強制中英雙版翻譯
- ❌ 留言系統、電子報訂閱、CMS/後台
- ❌ 分析工具（之後可選加）
- ❌ 遷移 Docusaurus 教學範例內容

## 11. 成功標準

- 9 篇真實文章皆能在**原網址**正常顯示（含圖片、程式碼高亮）。
- 4 篇筆記遷入 `/notes` 並可瀏覽；舊 `/docs/...` 有 redirect。
- push 到 `reantoilpc.github.io` main → Actions 自動建置部署成功，網站更新。
- Lighthouse 效能/SEO 分數 ≥ 95。
- 介面中英可切換、輸出正確 `hreflang`。
- 亮/暗模式、搜尋、RSS、sitemap 皆正常。
- 新增文章流程 = 新增一個 `.md` 檔 + push。

## 12. 風險與注意事項

- **舊 workflow 覆蓋**：務必停用 `docusaurus_websit/publish-blog.yml`（最高風險）。
- **Pages 來源切換**需使用者在 GitHub 設定頁操作一次。
- **網址保留**：逐篇核對 slug（其中 postman 文章 slug 無日期前綴，需特別對應）。
- **CJK 字型**：注意載入效能，優先系統字型或子集化。
- **圖片引用路徑**：Docusaurus 與 Astro 的引用方式不同，遷移時逐篇檢查。

## 13. 開放問題

- 是否日後加分析（如 GoatCounter/Plausible）：保留為未來選項。

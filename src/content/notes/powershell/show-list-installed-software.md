---
title: "列出電腦已安裝的軟體，匯出檔案"
description: ""
category: PowerShell
tags: ["powershell", "windows", "cli"]
order: 2
created: 2026-05-29
updated: 2026-05-29
lang: zh-TW
---

- 指令很簡單，但不推薦，因為當安裝有問題，會先進行修復，而導致需要等待，才會顯示資料

```shell
Get-WmiObject -Class Win32_Product | where vendor -eq CodeTwo | select Name, Version
```

- 比較推薦掃過 registry 己安裝清單會比較快速

> HKLM :  LM – 本地機器上的軟件
> HKCU :  CU - 代表當前用戶

```shell
$INSTALLED = Get-ItemProperty HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\* |  Select-Object DisplayName, DisplayVersion, Publisher, InstallDate
$INSTALLED += Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* |  Select-Object DisplayName, DisplayVersion, Publisher, InstallDate
$INSTALLED += Get-ItemProperty HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName
$INSTALLED | ?{ $_.DisplayName -ne $null } | sort-object -Property DisplayName -Unique | Format-Table -AutoSize > E:\install.txt
```

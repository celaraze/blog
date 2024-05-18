---
title: homebrew 服务错误 uninitialized constant Homebrew Service System
date: 2024-05-19
---

从源重新拉取一下服务更新

```shell
git -C "$(brew --repo homebrew/services)" remote set-url origin https://github.com/Homebrew/homebrew-services.git
```

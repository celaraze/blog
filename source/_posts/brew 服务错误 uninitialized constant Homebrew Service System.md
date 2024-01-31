---
title: brew 服务错误 uninitialized constant Homebrew Service System
tags:
  - macos
  - brew
categories:
  - 运维
abbrlink: 4132816066
date: 2023-04-17 10:06:30
---

从源重新拉取一下服务更新

```shell
git -C "$(brew --repo homebrew/services)" remote set-url origin https://github.com/Homebrew/homebrew-services.git
```
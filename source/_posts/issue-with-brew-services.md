---
title: brew 服务错误 uninitialized constant Homebrew::Service::System
date: 2023-04-17 10:06:30
tags:
  - macos
  - brew
categories:
  - 运维
---

从源重新拉取一下服务更新

```shell
git -C "$(brew --repo homebrew/services)" remote set-url origin https://github.com/Homebrew/homebrew-services.git
```
---
title: >-
  执行 brew update 命令时出现错误：The last gc run reported the following. Please correct
  the root cause and remove .git/gc.log.
tags:
  - macOS
  - homebrew
categories:
  - 运维
abbrlink: 3288834191
date: 2023-02-20 13:27:06
---

```shell
cd "$(brew --repo)"
git prune && git gc
```

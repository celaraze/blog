---
title: 执行 brew update 命令时出现错误：The last gc run reported the following
date: 2024-05-19
---

```shell
cd "$(brew --repo)"
git prune && git gc
```

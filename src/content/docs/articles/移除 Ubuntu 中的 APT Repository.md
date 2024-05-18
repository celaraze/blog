---
title: 移除 Ubuntu 中的 APT Repository
date: 2024-05-19
---

1：删除源目录中的清单：

`cd /etc/apt/sources.list.d`

找到想删除的库对应的 `.list` 文件。

2：使用 `apt-key list` 列出全部 key，找到想删除的 key 并执行 `sudo apt-key del 73C62A1B` 删除。

3：进入 `/usr/share/keyrings` 目录，找到想删除的 key 并直接删除对应文件即可。

---
title: Docker Volume 的数据迁移
date: 2024-05-19
---

## 从 docker volume 中复制数据到宿主机

docker run --rm -v volume_name:/volume -v /path/on/host:/backup alpine cp -a /volume/. /backup/

## 从宿主机中复制数据到 docker volume 中

docker run --rm -v volume_name:/volume -v /path/on/host:/backup alpine cp -a /backup/. /volume/

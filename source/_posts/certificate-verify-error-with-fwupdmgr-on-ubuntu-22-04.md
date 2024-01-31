---
title: Ubuntu22.04中使用fwupdmgr返回证书验证错误的问题
tags:
  - ubuntu
categories:
  - 运维
abbrlink: 502798705
date: 2023-03-31 11:01:46
---

## 错误描述

执行 `sudo fwupdmgr get-updates` 更新固件时，返回错误：

`failed to download file: server certificate verification failed. CAfile: none CRLfile: none`

可能由于用了代理或者是梯子导致的问题。

## 解决方案

增加 `--disable-ssl-strict` 参数跳过 SSL 验证。

`sudo fwupdmgr get-updates --disable-ssl-strict`
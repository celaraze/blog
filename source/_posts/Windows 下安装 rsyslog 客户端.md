---
title: Windows 下安装 rsyslog 客户端
tags:
  - windows
  - rsyslog
categories:
  - 运维
abbrlink: 1496507689
date: 2023-05-04 15:18:09
---
下载：https://code.google.com/archive/p/eventlog-to-syslog/downloads

安装为服务 `evtsys.exe -i -h 172.31.101.12 -p 514`

启动服务 `net start evtsys`
---
title: Ubuntu 20.04 安装 L2TP 服务
date: 2024-05-19
---

### 开放端口

1701 500 4500 50 51

### 安装 L2TP 服务

`sudo wget https://git.io/vpnsetup -O vpnsetup.sh && sudo sh vpnsetup.sh`

安装完成后会返回默认配置，记住他们

### 改密码&固定 IP

```
# /etc/ppp/chap-secrets 文件中

# 用户名 服务（固定l2tpd）密码 固定IP（如果不需要固定，就填*）
"username" l2tpd "password" 192.168.42.10
```

### 重启服务

`sudo service ipsec restart`

`sudo service xl2tpd restart`

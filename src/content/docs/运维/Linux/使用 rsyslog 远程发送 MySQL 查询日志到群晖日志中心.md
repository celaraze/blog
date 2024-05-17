---
title: 使用 rsyslog 远程发送 MySQL 查询日志到群晖日志中心
---

## 客户机的 MySQL 配置

默认 MySQL 不开启查询日志记录，这个东西很影响性能，如果服务器够强，可以开启，方法如下：

```
# 进入到 mysql 的配置文件，例如在 Ubuntu 中默认位置为：
# /etc/mysql/mysql.conf.d/mysqld.cnf

# 找到以下键值对，取消前面的注释使其生效
general_log_file        = /var/log/mysql/query.log
general_log             = 1

# 在最后增加一条时区设置的配置，如果没有它，日志内的时间戳是UTC的
log_timestamps = SYSTEM
```

配置修改完毕后重启 MySQL ：`sudo systemctl restart mysql`

然后给 MySQL 查询日志文件赋予全员可读取的权限：

```shell
sudo chmod 644 /var/log/mysql/query.log
```

## 客户机的 rsyslog 配置

我们需要在 rsyslog 的配置文件中写入日志获取和发送的规则：

```
# 进入到 rsyslog 配置文件，例如在 Ubuntu 中默认位置为：
# /etc/rsyslog.conf

#################
#### MODULES ####
#################

# 在模块下面添加以下规则

module(load="imfile" PollingInterval="5")

# 这里记得要指定到 MySQL 查询日志文件路径
# Tag会影响在群晖日志中心里面的显示是来自哪个程序的日志
input(type="imfile" File="/var/log/mysql/query.log" Tag="MySQL8")

# 如果有多个日志文件，直接多一行相同规则
# input(type="imfile" File="/var/log/mysql/query.log" Tag="MySQL8")

# 下面这个规则是启用本机全部的日志信息发送到指定IP:port
# 这里也就是我的群晖
*.* @192.168.222.100:514
```

配置修改完毕后重启 rsyslog ：`sudo systemctl restart rsyslog`

## 群晖配置

完成后即可在日志中心中查看其他服务器的所有日志，这里可以筛选。

配合群晖自带的消息通知，当 MySQL 日志存在紧急等级时，就能收到邮件告警了。

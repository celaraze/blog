---
title: Docker 安装 Prometheus & Grafana 监控 MySQL 性能指标
date: 2023-05-03 12:19:36
tags:
  - docker
  - prometheus
  - grafana
  - mysql
categories:
  - 运维
---

## Prometheus

1：拉取镜像 `docker pull prom/prometheus`。

2：创建 Prometheus 配置文件，`mkdir /docker/prometheus` 然后 `nano /docker/prometheus/prometheus.yml`。

配置文件：

```yaml
global:
  scrape_interval:     60s
  evaluation_interval: 60s
scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['172.17.0.1:9090']
        labels:
          instance: prometheus
  - job_name: mysql
    static_configs:
      - targets: ['172.17.0.1:9104']
```

3：启动容器：

```shell
docker run -itd --name prometheus -p 9090:9090 \
-v /docker/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
```

4：访问容器 IP:9090 即可。

## Grafana

1：拉取镜像 `docker pull grafana/grafana-oss`。

2：启动容器 `docker run -d -p 3000:3000 --name grafana grafana/grafana-oss:latest`。

3：访问容器 IP:3000 即可。

## Prometheus-mysqld-exporter

1：以 Ubuntu 22.04 为例，执行安装 `sudo apt install prometheus-mysqld-exporter`。

2：创建 exporter 配置文件，`mkdir /usr/local/mysqld_exporter` 然后 `nano my.cnf`。

```shell
# 连接数据库的用户名和密码
[client]
user=exporter
password=Password
```

3：为 MySQL 创建用户名和密码，与上面的一致：

`CREATE USER 'exporter'@'localhost' IDENTIFIED BY 'Password' WITH MAX_USER_CONNECTIONS 3;`

`GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'exporter'@'localhost';`

4：修改 prometheus-mysqld-exporter 的服务配置，`sudo nano /lib/systemd/system/prometheus-mysqld-exporter.service`。

```shell
[Unit]
Description=Prometheus exporter for MySQL server
Documentation=man:prometheus-mysqld-exporter(1)

[Service]
Restart=on-failure
User=prometheus
EnvironmentFile=/etc/default/prometheus-mysqld-exporter
# 注意这里 --config.my-cnf 后面的路径就是刚才我们创建的 my.cnf 文件路径
ExecStart=/usr/bin/prometheus-mysqld-exporter --config.my-cnf=/usr/local/mysqld_exporter/my.cnf

[Install]
WantedBy=multi-user.target
```

5：重载服务配置 `sudo systemctl daemon-reload`。

6：启动服务 `sudo systemctl start prometheus-mysqld-exporter.service`。

## Grafana 仪表盘配置

在 Grafana 中添加数据源选择 Prometheus，填写 IP:9090 确认访问成功。

导入 ID 为 7362 的仪表盘模板即可看到 MySQL 的采样数据了。

![](/images/posts/5.png)
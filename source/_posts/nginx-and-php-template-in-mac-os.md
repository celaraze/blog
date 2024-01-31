---
title: macOS 内 Nginx & PHP 单服务器配置模版
tags:
  - macos
  - nginx
  - php
categories:
  - 运维
abbrlink: 3222787883
date: 2021-08-18 17:08:28
---

```
server {
    listen       8081;
    server_name  localhost;
    root   /Users/celaraze/Desktop/jarvis-core/public;
    index  index.html index.htm index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

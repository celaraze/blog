---
title: Laravel 与 SAP 集成出现的unicode编码问题
tags:
  - laravel
categories:
  - 编程
abbrlink: 3939004902
date: 2021-12-10 16:33:37
---

使用 Laravel 内建的 HTTP Client 发送 POST 请求给 SAP 会因为编码问题造成中文解析错误，显示为 /u 开头的 unicode 字符。

尝试加入 `content-type: application/json;charset=utf-8` 也无效。

可以使用以下方式发送 Raw Body Data 解决：

```PHP
$data = [
    'name' => '张三'
];
$response = Http::withBody(json_encode($data, JSON_UNESCAPED_UNICODE), 'application/json')
    ->post('sap_url');
```

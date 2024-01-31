---
title: Laravel 替换依赖包中的视图
tags:
  - laravel
  - php
categories:
  - 编程
abbrlink: 4150171675
date: 2021-08-18 16:42:53
---

```
app('view')->prependNamespace('admin', resource_path('views/admin'));
```

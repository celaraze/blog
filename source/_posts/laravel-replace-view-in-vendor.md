---
title: Laravel 替换依赖包中的视图
date: 2021-08-18 16:42:53
tags:
  - laravel
  - php
categories: 
  - 编程
---

```
app('view')->prependNamespace('admin', resource_path('views/admin'));
```

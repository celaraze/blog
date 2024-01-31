---
title: PHP 数组排序
date: 2021-08-18 16:43:44
tags: 
  - php
categories: 
  - 编程
---

```
$keys = array_column($array, 'id');
array_multisort($keys, SORT_DESC, $array);
```

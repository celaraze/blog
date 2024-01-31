---
title: Carbon 处理某日是周几
date: 2021-08-18 16:54:38
tags:
  - carbon
  - php
categories: 
  - 编程
---

```
$day = (new Carbon($timestamp))->dayOfWeek;
```

`$timestamp` 可以使时间戳也可以是日期时间格式。

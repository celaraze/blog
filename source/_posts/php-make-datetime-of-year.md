---
title: PHP 构造某年的开始时间和结束时间
date: 2021-08-18 16:44:28
tags: 
  - php
categories: 
  - 编程
---

```
    /**
     * 返回某一年的开始时间和结束时间.
     *
     * @param $year
     * @param string $field
     *
     * @return string
     */
    public static function makeYearDate($year, $field = 'from'): string
    {
        $from = date('Y-m-d', mktime(0, 0, 0, 1, 1, $year));
        $to = date('Y-m-d', mktime(23, 59, 59, 12, 31, $year));
        if ($field == 'to') {
            return $to;
        }

        return $from;
    }
```

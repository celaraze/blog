---
title: PHP 最大连续签到天数
---

```php
$continue_days = 1;
$continue_days_array = [];
for ($i = 0; $i < $list_length; $i++) {
    // 今天
    $today = strtotime(explode(' ', $tracks[$i]->created_at)[0]);
    //
    if ($i == $list_length - 1) {
        $continue_days_array[] = $continue_days;
    } else {
        $yesterday = strtotime(explode(' ', $tracks[$i + 1]->created_at)[0]);
        $one_day = 24 * 3600;
        if ($today - $yesterday == $one_day) {
            $continue_days += 1;
        } else {
            $continue_days_array[] = $continue_days;
            $continue_days = 1;
        }
    }
}
if (count($continue_days_array) > 0) {
    $max_days = max($continue_days_array);
} else {
    $max_days = 0;
}
```

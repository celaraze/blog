---
title: PHP 数组排序
---

```php
$keys = array_column($array, 'id');
array_multisort($keys, SORT_DESC, $array);
```

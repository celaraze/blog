---
title: MySQL 代码片段
date: 2024-05-19
---

## 时间戳转为日期格式

```mysql
FROM_UNIXTIME(1234567890,'%Y-%m-%d %H:%i:%S')
```

## MySQL 8 中的分区表

> 如果已经存在数据，操作前记得备份数据

将现有表转换为范围分区表

```sql
ALTER TABLE table_name PARTITION BY RANGE COLUMNS(date) (
    PARTITION p1 VALUES LESS THAN ('2020-01-01'),
    PARTITION p2 VALUES LESS THAN ('2020-02-01'),
    PARTITION p3 VALUES LESS THAN ('2020-03-01'),
    PARTITION p4 VALUES LESS THAN (MAXVALUE)
);
```

将现有表转换为 HASH 分区表

```sql
ALTER TABLE table_name PARTITION BY HASH(column_name) PARTITIONS 10;
```

查看分区表状态：

```
SELECT partition_name, partition_ordinal_position, partition_method, partition_expression, partition_description, table_rows FROM information_schema.partitions WHERE table_schema = 'mirage' AND table_name = 'table_name';
```

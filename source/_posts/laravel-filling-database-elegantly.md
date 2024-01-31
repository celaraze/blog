---
title: 优雅地填充 Laravel 数据库数据
tags:
  - laravel
categories:
  - 编程
abbrlink: 2154632179
date: 2021-08-18 17:03:56
---

## 背景

我们都知道在 Laravel 开发过程中，对于数据库结构的修改可以通过 `migration` 完成，对于数据库生产数据的预填充可以使用 `seeder` 完成。

如果预填充的数据比较多，而又是在开发过程中产生的，手写 `seeder` 中的插入就显得过于死板，你可能需要一笔一笔的复制修改这些内容：

```PHP
\DB::table('software_categories')->insert(array(
            0 =>
                array(
                    'id' => 1,
                    'name' => '操作系统',
                    'description' => NULL,
                    'deleted_at' => NULL,
                    'created_at' => '2021-01-19 19:22:31',
                    'updated_at' => '2021-01-19 19:22:36',
                    'parent_id' => NULL,
                    'order' => '0',
                ),
            1 =>
                array(
                    'id' => 2,
                    'name' => '办公应用',
                    'description' => NULL,
                    'deleted_at' => NULL,
                    'created_at' => '2021-01-19 19:22:53',
                    'updated_at' => '2021-01-19 19:22:53',
                    'parent_id' => NULL,
                    'order' => '0',
                ),
            2 =>
                array(
                    'id' => 3,
                    'name' => '图像处理',
                    'description' => NULL,
                    'deleted_at' => NULL,
                    'created_at' => '2021-01-19 19:22:59',
                    'updated_at' => '2021-01-19 19:22:59',
                    'parent_id' => NULL,
                    'order' => '0',
                ),
            3 =>
                array(
                    'id' => 4,
                    'name' => '网络工具',
                    'description' => NULL,
                    'deleted_at' => NULL,
                    'created_at' => '2021-01-19 19:23:04',
                    'updated_at' => '2021-01-19 19:23:10',
                    'parent_id' => NULL,
                    'order' => '0',
                ),
            4 =>
                array(
                    'id' => 5,
                    'name' => '影音工具',
                    'description' => NULL,
                    'deleted_at' => NULL,
                    'created_at' => '2021-01-19 19:23:35',
                    'updated_at' => '2021-01-19 19:23:35',
                    'parent_id' => NULL,
                    'order' => '0',
                ),
            5 =>
                array(
                    'id' => 6,
                    'name' => '系统工具',
                    'description' => NULL,
                    'deleted_at' => NULL,
                    'created_at' => '2021-01-19 19:23:47',
                    'updated_at' => '2021-01-19 19:23:47',
                    'parent_id' => NULL,
                    'order' => '0',
                ),
            6 =>
                array(
                    'id' => 7,
                    'name' => '设计工具',
                    'description' => NULL,
                    'deleted_at' => NULL,
                    'created_at' => '2021-01-19 19:24:05',
                    'updated_at' => '2021-01-19 19:24:05',
                    'parent_id' => NULL,
                    'order' => '0',
                ),
        ));
```

这些数据如果够多，我相信你也一定会找一个好办法来批量处理。

## 方案

一，我可以在开发过程中对预填充的数据全部处理完成后，从数据库导出 `.sql` 文件，再作为脚本导入到生产环境。

二，我可以将数据库中已存在的数据进行结构化处理，生成 `seeder` 文件，之后就可以通过 `artisan db:seed` 命令进行填充。

这两种方法都可以。

### SQL 文件直接导入

使用数据库管理工具，如 HeidiSQL 导出需要的数据库表至 `.sql` 文件。

在 Laravel 中，可以编写一个 `command`，逻辑中写入以下代码：

```PHP
DB::unprepared(file_get_contents('path/data.sql'));
```

### Seeder 填充

这是我认为最佳的方案，毕竟 Laravel 提供了完善的数据库迁移和填充机制，何不利用它？

执行 `composer require orangehill/iseed -vvv` 安装包。

执行 `php artisan iseed table_name` 会自动在 `database/seeders` 目录中创建对应表名的 `seeder` 文件。

而后，我们就可以使用 `artisan db:seed --class=YourTableSeeder` 来指定填充。

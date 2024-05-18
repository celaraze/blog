---
title: Laravel 代码片段
date: 2024-05-19
---

## 替换依赖包中的视图

```php
app('view')->prependNamespace('admin', resource_path('views/admin'));
```

## 注册自定义命令

```php
    /**
     * @var string[] 自定义命令清单
     */
    protected $commands = [
        Console\InitAdminMenuCommand::class,
        Console\InstallCommand::class,
    ];

    /**
     * 注册自定义命令至Laravel的命令中
     *
     * @param array|mixed $commands
     * @return void
     */
    public function commands($commands)
    {
        $commands = is_array($commands) ? $commands : func_get_args();

        Application::starting(function ($artisan) use ($commands) {
            $artisan->resolveCommands($commands);
        });
    }
```

## easy-wechat 报错 Failed to cache access token

`/tmp/symfony-cache`

`/tmp/easywechat`

文件夹给 web 服务器写入权限，比如拥有者给 www，或者权限给 777。

## 与 SAP 集成出现的 unicode 编码问题

使用 Laravel 内建的 HTTP Client 发送 POST 请求给 SAP 会因为编码问题造成中文解析错误，显示为 /u 开头的 unicode 字符。

尝试加入 `content-type: application/json;charset=utf-8` 也无效。

可以使用以下方式发送 Raw Body Data 解决：

```php
$data = [
    'name' => '张三'
];
$response = Http::withBody(json_encode($data, JSON_UNESCAPED_UNICODE), 'application/json')
    ->post('sap_url');
```

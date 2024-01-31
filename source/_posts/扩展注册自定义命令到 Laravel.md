---
title: 扩展注册自定义命令到 Laravel
tags:
  - laravel
  - php
categories:
  - 编程
abbrlink: 3715223549
date: 2021-08-18 16:55:42
---

```PHP
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

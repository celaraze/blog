---
title: GuzzleHttp 并发异步请求
date: 2021-08-18 17:20:28
tags:
  - php
  - guzzlehttp
categories: 
  - 编程
---

```PHP
$client = new Client();

$requests = function ($total) {
    $uri = 'http://127.0.0.1:8126/guzzle-server/perf';
    for ($i = 0; $i < $total; $i++) {
        yield new Request('GET', $uri);
    }
};

$pool = new Pool($client, $requests(100), [
    'concurrency' => 5,
    'fulfilled' => function (Response $response, $index) {
        // 这里写成功的逻辑
    },
    'rejected' => function (RequestException $reason, $index) {
        // 这里写异常的逻辑
    },
]);

$promise = $pool->promise();
$promise->wait();
```

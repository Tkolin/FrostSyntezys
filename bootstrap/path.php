<?php

define('LARAVEL_START', microtime(true));

// Указываем путь к папке backend
$appPath = __DIR__.'/../backend';

require $appPath.'/vendor/autoload.php';

$app = require_once $appPath.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
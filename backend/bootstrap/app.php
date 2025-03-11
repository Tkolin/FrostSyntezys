<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'api/*', // Отключаем CSRF для всех API-запросов
            'graphql', // Отключаем CSRF для GraphQL
        ]);
 

        $middleware->validateCsrfTokens(except: [
            'api/*', // 🔥 Полностью отключаем CSRF для API
        ]);
        

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

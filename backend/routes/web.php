<?php

use Illuminate\Support\Facades\Route;
use MLL\GraphQLPlayground\GraphQLPlaygroundController;
use App\Http\Controllers\UserController;

// Главная страница
Route::get('/', function () {
    return view('welcome');
});

// GraphQL Playground
Route::get('/graphql-playground', [GraphQLPlaygroundController::class, 'get']);
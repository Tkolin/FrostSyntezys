<?php

use Illuminate\Support\Facades\Route;
use MLL\GraphQLPlayground\GraphQLPlaygroundController;

// Главная страница
Route::get('/', function () {
    return view('welcome');
});

// GraphQL Playground
Route::get('/graphql-playground', [GraphQLPlaygroundController::class, 'get']);
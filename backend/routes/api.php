<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ThermistorChainController; // Добавьте этот импорт
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Аутентификация
Route::post('/login', [AuthController::class, 'login']); // ✅ Должен быть POST!
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Локации
Route::get('/locations', [LocationController::class, 'index']); // Получить список локаций
Route::post('/locations', [LocationController::class, 'store']); // Создать новую локацию
Route::delete('/locations/{id}', [LocationController::class, 'destroy']); // Удалить локацию

Route::get('/test-delete-location/{id}', function ($id) {
    $mutation = new LocationMutation();
    $result = $mutation->deleteLocation(null, ['id' => $id]); // Вызываем мутацию
    return $result ? 'Удалено успешно' : 'Ошибка удаления';
});

// Оборудование (ThermistorChain)
Route::get('/thermistor-chains', [ThermistorChainController::class, 'index']); // Получить список оборудования
Route::post('/thermistor-chains', [ThermistorChainController::class, 'store']); // Создать новое оборудование
Route::get('/thermistor-chains/{id}', [ThermistorChainController::class, 'show']); // Получить одно оборудование по ID
Route::put('/thermistor-chains/{id}', [ThermistorChainController::class, 'update']); // Обновить оборудование
Route::delete('/thermistor-chains/{id}', [ThermistorChainController::class, 'destroy']); // Удалить оборудование


Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

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
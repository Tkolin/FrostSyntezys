<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']); // ✅ Должен быть POST!
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

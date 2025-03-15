<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Добавляем фасад Log

class UserController extends Controller
{
    // Получить список всех пользователей
    public function index()
    {
        try {
            $users = User::all();
            Log::info('Данные пользователей:', $users->toArray()); // Логируем данные
            return response()->json($users);
        } catch (\Exception $e) {
            Log::error('Ошибка при загрузке пользователей:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'error' => 'Ошибка при загрузке пользователей',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Создать нового пользователя
    public function store(Request $request)
    {
        try {
            // Валидация данных
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'role' => 'required|string|max:255',
            ]);

            // Создаем пользователя
            $user = User::create($data);

            // Логируем успешное создание
            Log::info('Пользователь успешно создан:', $user->toArray());

            return response()->json($user, 201);
        } catch (\Exception $e) {
            // Логируем ошибку
            Log::error('Ошибка при создании пользователя:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Ошибка при создании пользователя',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Получить данные одного пользователя по ID
    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user);
        } catch (\Exception $e) {
            Log::error('Ошибка при получении пользователя:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'error' => 'Ошибка при получении пользователя',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Обновить данные пользователя
    public function update(Request $request, $id)
    {
        try {
            // Находим пользователя по ID
            $user = User::findOrFail($id);

            // Валидация данных
            $data = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $user->id,
                'role' => 'sometimes|string|max:255',
            ]);

            // Обновляем пользователя
            $user->update($data);

            // Логируем успешное обновление
            Log::info('Пользователь успешно обновлён:', $user->toArray());

            return response()->json($user);
        } catch (\Exception $e) {
            // Логируем ошибку
            Log::error('Ошибка при обновлении пользователя:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Ошибка при обновлении пользователя',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Удалить пользователя
    public function destroy($id)
    {
        try {
            // Находим пользователя по ID
            $user = User::findOrFail($id);

            // Удаляем пользователя
            $user->delete();

            // Логируем успешное удаление
            Log::info('Пользователь успешно удалён:', ['id' => $id]);

            return response()->json(null, 204);
        } catch (\Exception $e) {
            // Логируем ошибку
            Log::error('Ошибка при удалении пользователя:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Ошибка при удалении пользователя',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class RegisterUser
{
    public function __invoke(null $_, array $args)
    {
        // Валидация данных
        $validated = validator($args, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ])->validate();

        // Создание пользователя
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Генерация токена
        $token = $user->createToken('authToken')->plainTextToken;
        error_log("s". $token);
        return [
            'status' => 200,
            'access_token' => $token,
            'user' => $user,
        ];
    }
}

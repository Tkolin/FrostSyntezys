<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class Login
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        // Валидация входных данных
        $validated = validator($args, [
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ])->validate();

        // Проверка пользователя
        $user = User::where('name', $validated['name'])->first();

        // Проверка пароля
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'name' => ['Неверный логин или пароль.'],
            ]);
        }

        // Генерация токена
        $token = $user->createToken('authToken')->plainTextToken;

        return [
            'status' => 200,
            'access_token' => $token,
            'user' => $user,
        ];
    }
}

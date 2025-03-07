<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

final class LoginUser
{
    public function __invoke(null $_, array $args)
    {
        // Валидация входных данных
        $validated = validator($args, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ])->validate();

        // Попытка авторизации
        if (!Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            throw ValidationException::withMessages([
                'email' => ['Неверный email или пароль.'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return [
            'access_token' => $token,
            'user' => $user,
        ];
    }
}

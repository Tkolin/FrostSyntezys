<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

final readonly class Me
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        error_log("w".Auth::user());
        return Auth::user(); // Возвращает текущего аутентифицированного пользователя
    }
}

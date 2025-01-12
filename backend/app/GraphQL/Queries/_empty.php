<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

final readonly class _empty
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        return null; // Или любое значение, которое вы хотите вернуть
    }
}

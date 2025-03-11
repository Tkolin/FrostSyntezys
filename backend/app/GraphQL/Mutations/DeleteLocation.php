<?php

namespace App\GraphQL\Mutations;

use App\Models\Location;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class DeleteLocation
{
    public function __invoke($rootValue, array $args, GraphQLContext $context)
    {
        if (empty($args['id'])) {
            throw new \Exception('ID не передан или пуст');
        }

        $id = (int) $args['id'];
        $location = Location::find($id);

        if (!$location) {
            throw new \Exception('Локация не найдена');
        }

        $success = (bool) $location->delete();
        return $success; // Возвращаем true/false
    }
}
<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Location;
use Illuminate\Support\Collection;

final readonly class SyncLocationsHierarchy
{
    /**
     * @param  null  $_
     * @param  array{ hierarchy: array<LocationNode> }  $args
     * @return bool
     */
    public function __invoke(null $_, array $args): bool
    {
        $nodes = collect($args['hierarchy']);
        $this->syncLevel($nodes, null);
        return true;
    }

    /**
     * Рекурсивно синхронизируем уровень и устанавливаем main_location_id
     *
     * @param Collection<int, array{id: string, children?: array}> $nodes
     * @param int|null $parentId
     */
    private function syncLevel(Collection $nodes, ?int $parentId): void
    {
        foreach ($nodes as $node) {
            /** @var Location $loc */
            $loc = Location::findOrFail($node['id']);
            // Обновляем main_location_id
            $loc->update(['main_location_id' => $parentId]);

            // Если есть дети — рекурсивно идём дальше
            if (!empty($node['children'])) {
                $this->syncLevel(collect($node['children']), (int)$loc->id);
            }
        }
    }
}

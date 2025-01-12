<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class GenerateGraphqlSchema extends Command
{
    protected $signature = 'graphql:generate-schemas';
    protected $description = 'Generate GraphQL schemas based on Eloquent models';

    public function handle()
    {
        $modelsPath = app_path('Models');
        $schemasPath = base_path('graphql/schemas');

        if (!File::exists($schemasPath)) {
            File::makeDirectory($schemasPath, 0755, true);
        }

        $files = File::files($modelsPath);

        foreach ($files as $file) {
            $modelName = Str::replaceLast('.php', '', $file->getFilename());
            $modelNamespace = "App\\Models\\$modelName";

            if (!class_exists($modelNamespace)) {
                $this->error("Model $modelNamespace does not exist.");
                continue;
            }

            $schema = $this->generateSchema($modelName, $modelNamespace);

            File::put("$schemasPath/$modelName.graphql", $schema);
            $this->info("Schema for $modelName generated.");
        }
    }

    protected function generateSchema(string $modelName, string $modelNamespace): string
    {
        $modelInstance = new $modelNamespace;
        $fields = '';
        $relationships = '';

        // Используем рефлексию для анализа PHPDoc
        $reflection = new \ReflectionClass($modelNamespace);

        // Получение комментариев класса
        $docComment = $reflection->getDocComment();

        if ($docComment) {
            // Разбор комментариев для свойств и связей
            $lines = explode("\n", $docComment);
            foreach ($lines as $line) {
                // Ищем строки с "@property"
                if (strpos($line, '@property') !== false) {
                    $line = trim($line);

                    // Извлекаем тип, имя и связь
                    preg_match('/@property\s+([^\s]+)\s+\$([^\s]+)/', $line, $matches);

                    if (count($matches) === 3) {
                        $type = $matches[1];
                        $name = $matches[2];

                        // Проверяем, является ли это коллекцией (массивом связей)
                        if (strpos($type, 'Collection|') !== false) {
                            $relatedModel = str_replace(['Collection|', '[]'], '', $type);
                            $relationships .= "        $name: [$relatedModel!]! @hasMany\n";
                        } elseif (class_exists($type)) {
                            $relationships .= "        $name: $type @belongsTo\n";
                        } else {
                            // Это поле модели
                            $graphqlType = $this->mapPhpTypeToGraphql($type);
                            $fields .= "        $name: $graphqlType\n";
                        }
                    }
                }
            }
        }

        return <<<SCHEMA
extend type Query {
    {$modelName}s: [{$modelName}!]! @all
    {$modelName}Paginated(first: Int, page: Int): [{$modelName}!]! @paginate
    {$modelName}(id: ID!): {$modelName} @find
}

extend type Mutation {
    create{$modelName}(
$fields    ): {$modelName} @create

    update{$modelName}(id: ID!,
$fields    ): {$modelName} @update

    delete{$modelName}(id: ID!): {$modelName} @delete
}

type {$modelName} {
$fields    id: ID!
$relationships
}
SCHEMA;
    }

    public function mapPhpTypeToGraphql(string $phpType): string
    {
        $typeMapping = [
            'int' => 'Int',
            'integer' => 'Int',
            'string' => 'String',
            'float' => 'Float',
            'double' => 'Float',
            'bool' => 'Boolean',
            'boolean' => 'Boolean',
            '\DateTime' => 'DateTime',
        ];

        return $typeMapping[$phpType] ?? 'String';
    }



}

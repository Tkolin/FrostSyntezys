<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class GenerateDraftYaml extends Command
{
    protected $signature = 'generate:draft-yaml';
    protected $description = 'Generate draft.yaml for Blueprint based on existing models';

    public function handle()
    {
        $modelsPath = app_path('Models');
        $draftPath = base_path('draft.yaml');

        if (!File::exists($modelsPath)) {
            $this->error("Models directory not found: $modelsPath");
            return;
        }

        $files = File::files($modelsPath);
        $models = [];

        foreach ($files as $file) {
            $modelName = Str::replaceLast('.php', '', $file->getFilename());
            $modelNamespace = "App\\Models\\$modelName";

            if (!class_exists($modelNamespace)) {
                $this->error("Model $modelNamespace does not exist.");
                continue;
            }

            $modelInstance = new $modelNamespace;
            $fillable = $modelInstance->getFillable();
            $relationships = $this->getRelationships($modelInstance);

            $modelData = [
                'id' => 'id',
            ];

            foreach ($fillable as $field) {
                $modelData[$field] = 'string';
            }

            if ($relationships) {
                $modelData['relationships'] = $relationships;
            }

            $models[$modelName] = $modelData;
        }

        $yamlContent = $this->convertToYaml(['models' => $models]);

        File::put($draftPath, $yamlContent);

        $this->info("Draft file generated at: $draftPath");
    }

    private function getRelationships($modelInstance)
    {
        $methods = get_class_methods($modelInstance);
        $relationships = [];

        foreach ($methods as $method) {
            try {
                $relation = $modelInstance->$method();

                if ($relation instanceof \Illuminate\Database\Eloquent\Relations\Relation) {
                    $relatedModel = class_basename(get_class($relation->getRelated()));

                    if ($relation instanceof \Illuminate\Database\Eloquent\Relations\HasMany) {
                        $relationships[$method] = 'hasMany';
                    } elseif ($relation instanceof \Illuminate\Database\Eloquent\Relations\BelongsTo) {
                        $relationships[$method] = 'belongsTo';
                    } elseif ($relation instanceof \Illuminate\Database\Eloquent\Relations\HasOne) {
                        $relationships[$method] = 'hasOne';
                    } elseif ($relation instanceof \Illuminate\Database\Eloquent\Relations\BelongsToMany) {
                        $relationships[$method] = 'belongsToMany';
                    }
                }
            } catch (\Throwable $e) {
                continue;
            }
        }

        return $relationships;
    }

    private function convertToYaml(array $data)
    {
        $yaml = '';
        foreach ($data as $key => $value) {
            $yaml .= $this->toYaml($key, $value);
        }
        return $yaml;
    }

    private function toYaml($key, $value, $depth = 0)
    {
        $indent = str_repeat('  ', $depth);
        $yaml = "$indent$key:\n";

        if (is_array($value)) {
            foreach ($value as $subKey => $subValue) {
                if (is_array($subValue)) {
                    $yaml .= $this->toYaml($subKey, $subValue, $depth + 1);
                } else {
                    $yaml .= str_repeat('  ', $depth + 1) . "$subKey: $subValue\n";
                }
            }
        } else {
            $yaml .= str_repeat('  ', $depth + 1) . "$value\n";
        }

        return $yaml;
    }
}

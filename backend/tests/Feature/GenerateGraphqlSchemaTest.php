<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Tests\TestCase;

class GenerateGraphqlSchemaTest extends TestCase
{
    /**
     * Тестирование команды на успешную генерацию схем
     *
     * @return void
     */
    public function testGenerateGraphqlSchemas()
    {
        // Убедитесь, что директория для схем пуста
        $schemasPath = base_path('graphql/schemas');
        if (File::exists($schemasPath)) {
            File::deleteDirectory($schemasPath);
        }

        // Выполнить команду
        Artisan::call('graphql:generate-schemas');

        // Проверить, что директория создана
        $this->assertDirectoryExists($schemasPath, 'Папка для схем не создана.');

        // Проверить наличие схем для всех моделей
        $modelsPath = app_path('Models');
        $files = File::files($modelsPath);

        foreach ($files as $file) {
            $modelName = str_replace('.php', '', $file->getFilename());
            $schemaPath = "$schemasPath/$modelName.graphql";

            $this->assertFileExists($schemaPath, "Схема для модели $modelName не была создана.");

            // Проверить содержимое схемы
            $schemaContent = File::get($schemaPath);
            $this->assertStringContainsString("type $modelName", $schemaContent, "В схеме $modelName отсутствует тип GraphQL.");
        }
    }

    /**
     * Тестирование корректного преобразования типов
     */
    public function testPhpTypeToGraphqlMapping()
    {
        $command = new \App\Console\Commands\GenerateGraphqlSchema();
        $reflection = new \ReflectionClass($command);
        $method = $reflection->getMethod('mapPhpTypeToGraphql');
        $method->setAccessible(true);

        $this->assertEquals('Int', $method->invoke($command, 'int'), 'Тип int не преобразуется в Int.');
        $this->assertEquals('String', $method->invoke($command, 'string'), 'Тип string не преобразуется в String.');
        $this->assertEquals('Float', $method->invoke($command, 'float'), 'Тип float не преобразуется в Float.');
        $this->assertEquals('Boolean', $method->invoke($command, 'bool'), 'Тип bool не преобразуется в Boolean.');
        $this->assertEquals('String', $method->invoke($command, 'unknown'), 'Неизвестный тип должен преобразоваться в String.');
    }

}

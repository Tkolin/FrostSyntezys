<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class AutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Получаем список таблиц
        $tables = DB::select('SHOW TABLES');
        $dbName = env('DB_DATABASE');
        $tableKey = "Tables_in_{$dbName}";

        foreach ($tables as $table) {
            $tableName = $table->$tableKey;

            // Пропускаем таблицы миграций, если нужно
            if (in_array($tableName, ['migrations', 'password_resets'])) {
                continue;
            }

            $columns = DB::select("DESCRIBE {$tableName}");
            $data = [];

            // Генерация данных для каждой строки
            for ($i = 0; $i < 50; $i++) { // Генерация 50 строк на таблицу
                $row = [];
                foreach ($columns as $column) {
                    $row[$column->Field] = $this->generateValue($column, $faker);
                }
                $data[] = $row;
            }

            // Вставка данных в таблицу
            DB::table($tableName)->insert($data);
            $this->command->info("Таблица '{$tableName}' заполнена 50 строками.");
        }
    }

    /**
     * Генерация значения для каждого типа данных.
     *
     * @param  object  $column
     * @param  Faker\Generator $faker
     * @return mixed
     */
    private function generateValue($column, $faker)
    {
        $type = strtolower($column->Type);

        if ($column->Field == 'id') {
            return null; // Автоинкрементные ID игнорируем
        }

        if (strpos($type, 'int') !== false) {
            return $faker->numberBetween(1, 1000);
        }

        if (strpos($type, 'varchar') !== false || strpos($type, 'text') !== false) {
            if (stripos($column->Field, 'email') !== false) {
                return $faker->email;
            }
            return $faker->word;
        }

        if (strpos($type, 'char') !== false) {
            return $faker->randomLetter;
        }

        if (strpos($type, 'date') !== false) {
            return $faker->date;
        }

        if (strpos($type, 'decimal') !== false || strpos($type, 'float') !== false) {
            return $faker->randomFloat(2, 1, 1000);
        }

        return null; // Если тип не поддерживается, возвращаем null
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        foreach ([
            'notifications', 'metering_thermistor_chain_points', 'metering_thermistor_chains',
            'installed_thermistor_chain_points', 'installed_thermistor_chains',
            'thermistor_chains', 'locations', 'role_user', 'users',
        ] as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        $now = Carbon::now();

        // ---------- Пользователи (вход по полю name) + роли ----------
        // Ключи ролей соответствуют меню в DefaultLayout: ADMIN, FIELD_TECH, CHIEF_ENGINEER, ANALYST.
        $users = [];
        foreach ([
            ['admin', 'admin@example.com', ['ADMIN']],
            ['operator', 'operator@example.com', ['FIELD_TECH']],
            ['engineer', 'engineer@example.com', ['CHIEF_ENGINEER', 'ANALYST']],
        ] as [$name, $email, $roleKeys]) {
            $userId = DB::table('users')->insertGetId([
                'name' => $name,
                'email' => $email,
                'email_verified_at' => $now,
                'password' => Hash::make('password'),
                'created_at' => $now,
                'updated_at' => $now,
            ]);
            $users[] = $userId;
            foreach ($roleKeys as $roleKey) {
                DB::table('role_user')->insert(['user_id' => $userId, 'role_key' => $roleKey]);
            }
        }

        // ---------- Локации (иерархия объект → площадка) ----------
        $objects = [
            ['Ямбургское месторождение', 67.985, 75.012],
            ['Бованенково, куст 1', 70.281, 68.351],
            ['Норильск, ТЭЦ-3', 69.342, 88.187],
            ['Салехард, складской комплекс', 66.530, 66.601],
        ];
        $locationIds = [];
        foreach ($objects as [$name, $x, $y]) {
            $mainId = DB::table('locations')->insertGetId([
                'name' => $name, 'x' => $x, 'y' => $y, 'main_location_id' => null,
                'created_at' => $now, 'updated_at' => $now,
            ]);
            $locationIds[] = $mainId;
            for ($s = 1; $s <= 2; $s++) {
                $locationIds[] = DB::table('locations')->insertGetId([
                    'name' => "$name — площадка $s",
                    'x' => round($x + mt_rand(-50, 50) / 1000, 6),
                    'y' => round($y + mt_rand(-50, 50) / 1000, 6),
                    'main_location_id' => $mainId,
                    'created_at' => $now, 'updated_at' => $now,
                ]);
            }
        }

        // ---------- Модели термокос ----------
        $chainModels = [
            ['ТК-Холод 32', 'Термокоса грунтовая 32-точечная', 32],
            ['ТК-Холод 16', 'Термокоса грунтовая 16-точечная', 16],
            ['ТК-Арктика 48', 'Термокоса высокоточная 48-точечная', 48],
            ['ТК-Гео 24', 'Термокоса геотехническая 24-точечная', 24],
        ];
        $chainIds = [];
        foreach ($chainModels as $idx => [$model, $name, $sensorCount]) {
            $chainIds[] = DB::table('thermistor_chains')->insertGetId([
                'number' => sprintf('TK-%04d', 1000 + $idx),
                'name' => $name,
                'model' => $model,
                'measurement_range' => 80,
                'error_margin' => 0.1,
                'measurement_discreteness' => 0.01,
                'sensor_count' => $sensorCount,
                'sensor_distance' => 0.5,
                'external_interfaces' => 'RS-485, Modbus RTU',
                'additional_interfaces' => 'USB',
                'memory_type' => 'Flash 4MB',
                'antenna_type' => 'GSM/LoRa',
                'battery_type' => 'Li-SOCl2',
                'battery_count' => 2,
                'dimensions' => '∅12 мм',
                'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        // ---------- Установленные термокосы + точки + замеры + уведомления ----------
        $units = '°C';
        $depths = [0.5, 1.0, 2.0, 3.5, 5.0, 7.0];

        for ($i = 0; $i < 12; $i++) {
            $installedId = DB::table('installed_thermistor_chains')->insertGetId([
                'thermistor_chain_id' => $chainIds[array_rand($chainIds)],
                'location_id' => $locationIds[array_rand($locationIds)],
                'min_warning_temperature' => -2.0,
                'max_warning_temperature' => 1.0,
                'min_critical_temperature' => -1.0,
                'max_critical_temperature' => 2.0,
                'created_at' => $now, 'updated_at' => $now,
            ]);

            // Точки по глубине
            $pointIds = [];
            foreach ($depths as $deep) {
                $pointIds[] = DB::table('installed_thermistor_chain_points')->insertGetId([
                    'installed_thermistor_chains_id' => $installedId,
                    'deep' => (string) $deep,
                    'min_warning_temperature' => -2.0,
                    'max_warning_temperature' => 1.0,
                    'min_critical_temperature' => -1.0,
                    'max_critical_temperature' => 2.0,
                    'created_at' => $now, 'updated_at' => $now,
                ]);
            }

            // Сессии замеров (последние недели)
            for ($m = 0; $m < 4; $m++) {
                $date = $now->copy()->subDays($m * 7);
                $meteringId = DB::table('metering_thermistor_chains')->insertGetId([
                    'installed_thermistor_chains_id' => $installedId,
                    'date_metering' => $date->toDateTimeString(),
                    'created_at' => $now, 'updated_at' => $now,
                ]);

                foreach ($pointIds as $depthIndex => $pointId) {
                    // Тёплый деятельный слой у поверхности → мерзлота на глубине.
                    // Приповерхностные точки могут превышать пороги (генерируют уведомления).
                    $temp = round(2.5 - $depthIndex * 0.9 + mt_rand(-80, 120) / 100, 2);
                    $meteringPointId = DB::table('metering_thermistor_chain_points')->insertGetId([
                        'metering_thermistor_chain_id' => $meteringId,
                        'installed_thermistor_chain_point_id' => $pointId,
                        'value' => (string) $temp,
                        'unit_id' => $units,
                        'created_at' => $now, 'updated_at' => $now,
                    ]);

                    // Уведомление при выходе за пороги
                    if ($temp > 1.0) {
                        $critical = $temp > 2.0;
                        DB::table('notifications')->insert([
                            'metering_thermistor_chain_point_id' => $meteringPointId,
                            'installed_thermistor_chains_id' => $installedId,
                            'type_notification_key' => $critical ? 'critical' : 'warning',
                            'description' => sprintf(
                                '%s: температура %.2f °C на глубине %s м',
                                $critical ? 'Критическое превышение' : 'Предупреждение',
                                $temp,
                                $depths[$depthIndex]
                            ),
                            'date_start' => $date->toDateTimeString(),
                            'date_end' => $date->copy()->addHours(6)->toDateTimeString(),
                            'user_id' => (string) $users[array_rand($users)],
                            'created_at' => $now, 'updated_at' => $now,
                        ]);
                    }
                }
            }
        }
    }
}

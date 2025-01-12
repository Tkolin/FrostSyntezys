<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        // Очистка таблиц
        DB::table('installed_thermistor_chain_points')->truncate();
        DB::table('metering_thermistor_chain_points')->truncate();
        DB::table('metering_thermistor_chains')->truncate();
        DB::table('notifications')->truncate();
        DB::table('installed_thermistor_chains')->truncate();
        DB::table('thermistor_chains')->truncate();
        DB::table('locations')->truncate();
        DB::table('cache')->truncate();
        DB::table('cache_locks')->truncate();
        DB::table('users')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

        // Генерация данных
        $this->seedUsers($faker);
        $this->seedCache($faker);
        $this->seedCacheLocks($faker);
        $this->seedLocations($faker);
        $this->seedThermistorChains($faker);
        $this->seedInstalledThermistorChains($faker);
        $this->seedInstalledThermistorChainPoints($faker);
        $this->seedMeteringThermistorChains($faker);
        $this->seedMeteringThermistorChainPoints($faker);
        $this->seedNotifications($faker);
    }


    private function seedUsers($faker)
    {
        DB::table('users')->truncate();
        for ($i = 0; $i < 50; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'email_verified_at' => $faker->dateTime,
                'password' => bcrypt('password'),
                'remember_token' => $faker->md5,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedCache($faker)
    {
        DB::table('cache')->truncate();
        for ($i = 0; $i < 50; $i++) {
            DB::table('cache')->insert([
                'key' => $faker->unique()->word,
                'value' => $faker->text,
                'expiration' => $faker->numberBetween(100, 1000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedCacheLocks($faker)
    {
        DB::table('cache_locks')->truncate();
        for ($i = 0; $i < 50; $i++) {
            DB::table('cache_locks')->insert([
                'key' => $faker->unique()->word,
                'owner' => $faker->name,
                'expiration' => $faker->numberBetween(100, 1000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedLocations($faker)
    {
        DB::table('locations')->truncate();
        for ($i = 0; $i < 50; $i++) {
            DB::table('locations')->insert([
                'x' => $faker->randomFloat(6, -90, 90),
                'y' => $faker->randomFloat(6, -180, 180),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedThermistorChains($faker)
    {
        DB::table('thermistor_chains')->truncate();
        for ($i = 0; $i < 50; $i++) {
            DB::table('thermistor_chains')->insert([
                'id' => $i + 1,
                'number' => $faker->unique()->uuid,
                'name' => $faker->word,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedInstalledThermistorChains($faker)
    {
        DB::table('installed_thermistor_chains')->truncate();
        $locations = DB::table('locations')->pluck('id')->toArray();
        $thermistorChains = DB::table('thermistor_chains')->pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
            DB::table('installed_thermistor_chains')->insert([
                'id' => $i + 1,
                'thermistor_chain_id' => $faker->randomElement($thermistorChains),
                'location_id' => $faker->randomElement($locations),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedInstalledThermistorChainPoints($faker)
    {
        DB::table('installed_thermistor_chain_points')->truncate();
        $installedChains = DB::table('installed_thermistor_chains')->pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
            DB::table('installed_thermistor_chain_points')->insert([
                'installed_thermistor_chains_id' => $faker->randomElement($installedChains),
                'deep' => $faker->randomFloat(2, 0, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedMeteringThermistorChains($faker)
    {
        DB::table('metering_thermistor_chains')->truncate();
        $installedChains = DB::table('installed_thermistor_chains')->pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
            DB::table('metering_thermistor_chains')->insert([
                'installed_thermistor_chains_id' => $faker->randomElement($installedChains),
                'date_metering' => $faker->dateTime,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedMeteringThermistorChainPoints($faker)
    {
        DB::table('metering_thermistor_chain_points')->truncate();
        $meteringChains = DB::table('metering_thermistor_chains')->pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
            DB::table('metering_thermistor_chain_points')->insert([
                'metering_thermistor_chain_id' => $faker->randomElement($meteringChains),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function seedNotifications($faker)
    {
        DB::table('notifications')->truncate();
        $installedChains = DB::table('installed_thermistor_chains')->pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
            DB::table('notifications')->insert([
                'installed_thermistor_chains_id' => $faker->randomElement($installedChains),
                'description' => $faker->text,
                'date_start' => $faker->dateTime,
                'date_end' => $faker->optional()->dateTime,
                'user_id' => $faker->randomNumber(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

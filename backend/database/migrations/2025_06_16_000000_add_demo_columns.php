<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Приводит схему БД в соответствие с GraphQL-контрактом (graphql/schemas/*.graphql)
 * и фронтендом: добавляет колонки, которых не было в авто-сгенерированных миграциях.
 * Все колонки nullable — безопасно для существующих данных.
 */
return new class extends Migration {
    public function up(): void
    {
        Schema::table('locations', function (Blueprint $table) {
            if (!Schema::hasColumn('locations', 'name')) $table->string('name')->nullable();
            if (!Schema::hasColumn('locations', 'x')) $table->decimal('x', 10, 6)->nullable();
            if (!Schema::hasColumn('locations', 'y')) $table->decimal('y', 10, 6)->nullable();
            if (!Schema::hasColumn('locations', 'main_location_id')) $table->unsignedBigInteger('main_location_id')->nullable();
        });

        Schema::table('thermistor_chains', function (Blueprint $table) {
            foreach ([
                'number' => 'string', 'external_interfaces' => 'string', 'additional_interfaces' => 'string',
                'memory_type' => 'string', 'antenna_type' => 'string', 'battery_type' => 'string', 'dimensions' => 'string',
            ] as $col => $_) {
                if (!Schema::hasColumn('thermistor_chains', $col)) $table->string($col)->nullable();
            }
            if (!Schema::hasColumn('thermistor_chains', 'measurement_range')) $table->integer('measurement_range')->nullable();
            if (!Schema::hasColumn('thermistor_chains', 'sensor_count')) $table->integer('sensor_count')->nullable();
            if (!Schema::hasColumn('thermistor_chains', 'battery_count')) $table->integer('battery_count')->nullable();
            if (!Schema::hasColumn('thermistor_chains', 'error_margin')) $table->float('error_margin')->nullable();
            if (!Schema::hasColumn('thermistor_chains', 'measurement_discreteness')) $table->float('measurement_discreteness')->nullable();
            if (!Schema::hasColumn('thermistor_chains', 'sensor_distance')) $table->float('sensor_distance')->nullable();
        });

        Schema::table('installed_thermistor_chains', function (Blueprint $table) {
            foreach (['min_warning_temperature', 'max_warning_temperature', 'min_critical_temperature', 'max_critical_temperature'] as $col) {
                if (!Schema::hasColumn('installed_thermistor_chains', $col)) $table->float($col)->nullable();
            }
        });

        Schema::table('installed_thermistor_chain_points', function (Blueprint $table) {
            foreach (['min_warning_temperature', 'max_warning_temperature', 'min_critical_temperature', 'max_critical_temperature'] as $col) {
                if (!Schema::hasColumn('installed_thermistor_chain_points', $col)) $table->float($col)->nullable();
            }
        });

        Schema::table('metering_thermistor_chain_points', function (Blueprint $table) {
            if (!Schema::hasColumn('metering_thermistor_chain_points', 'installed_thermistor_chain_point_id')) $table->unsignedBigInteger('installed_thermistor_chain_point_id')->nullable();
            if (!Schema::hasColumn('metering_thermistor_chain_points', 'unit_id')) $table->string('unit_id')->nullable();
        });

        Schema::table('notifications', function (Blueprint $table) {
            if (!Schema::hasColumn('notifications', 'metering_thermistor_chain_point_id')) $table->unsignedBigInteger('metering_thermistor_chain_point_id')->nullable();
            if (!Schema::hasColumn('notifications', 'type_notification_key')) $table->string('type_notification_key')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('locations', fn (Blueprint $t) => $t->dropColumn(['name', 'x', 'y', 'main_location_id']));
        Schema::table('thermistor_chains', fn (Blueprint $t) => $t->dropColumn([
            'number', 'external_interfaces', 'additional_interfaces', 'memory_type', 'antenna_type', 'battery_type',
            'dimensions', 'measurement_range', 'sensor_count', 'battery_count', 'error_margin', 'measurement_discreteness', 'sensor_distance',
        ]));
        Schema::table('installed_thermistor_chains', fn (Blueprint $t) => $t->dropColumn([
            'min_warning_temperature', 'max_warning_temperature', 'min_critical_temperature', 'max_critical_temperature',
        ]));
        Schema::table('installed_thermistor_chain_points', fn (Blueprint $t) => $t->dropColumn([
            'min_warning_temperature', 'max_warning_temperature', 'min_critical_temperature', 'max_critical_temperature',
        ]));
        Schema::table('metering_thermistor_chain_points', fn (Blueprint $t) => $t->dropColumn(['installed_thermistor_chain_point_id', 'unit_id']));
        Schema::table('notifications', fn (Blueprint $t) => $t->dropColumn(['metering_thermistor_chain_point_id', 'type_notification_key']));
    }
};

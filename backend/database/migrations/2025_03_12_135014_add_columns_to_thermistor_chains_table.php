<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('thermistor_chains', function (Blueprint $table) {
            $table->string('number')->nullable();
            $table->integer('point_count')->nullable();
            $table->float('point_step')->nullable();
            $table->integer('measurement_range')->nullable();
            $table->float('error_margin')->nullable();
            $table->float('measurement_discreteness')->nullable();
            $table->integer('sensor_count')->nullable();
            $table->float('sensor_distance')->nullable();
            $table->string('external_interfaces')->nullable();
            $table->string('additional_interfaces')->nullable();
            $table->string('memory_type')->nullable();
            $table->string('antenna_type')->nullable();
            $table->string('battery_type')->nullable();
            $table->integer('battery_count')->nullable();
            $table->string('dimensions')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('thermistor_chains', function (Blueprint $table) {
            $table->dropColumn([
                'number',
                'point_count',
                'point_step',
                'measurement_range',
                'error_margin',
                'measurement_discreteness',
                'sensor_count',
                'sensor_distance',
                'external_interfaces',
                'additional_interfaces',
                'memory_type',
                'antenna_type',
                'battery_type',
                'battery_count',
                'dimensions',
            ]);
        });
    }
};
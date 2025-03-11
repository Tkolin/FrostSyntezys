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
    if (!Schema::hasTable('locations')) {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('x', 10, 6);
            $table->decimal('y', 10, 6);
            $table->timestamps();
            $table->softDeletes();
        });
    }
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
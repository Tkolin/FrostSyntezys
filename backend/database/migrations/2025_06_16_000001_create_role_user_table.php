<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Таблица ролей пользователей под модель App\Models\UserRole (table = role_user).
 * Аксессор User::role_keys плюёт role_key отсюда; без таблицы запрос `me` падал,
 * из-за чего фронтенд считал пользователя неавторизованным и показывал только «Вход».
 */
return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('role_user')) {
            Schema::create('role_user', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->index();
                $table->string('role_key');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('role_user');
    }
};

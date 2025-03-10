<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';

    protected $casts = [
        'email_verified_at' => 'datetime'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $fillable = [
        'id',
        'name',
        'email',
        'email_verified_at',
        'password',
        'remember_token'
    ];

    // Если нужно, чтобы вычисляемый атрибут автоматически добавлялся при преобразовании модели в массив/JSON
    protected $appends = ['role_keys'];

    // Определяем связь с моделью UserRole
    public function roles()
    {
        return $this->hasMany(UserRole::class, 'user_id');
    }

    // Аксессор для вычисляемого атрибута role_keys
    public function getRoleKeysAttribute()
    {
        return $this->roles->pluck('role_key')->toArray();
    }
}

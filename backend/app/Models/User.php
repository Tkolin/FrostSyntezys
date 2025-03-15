<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'name',
        'email',
        'role', // Убедись, что поле `role` указано здесь
        'password',
    ];
}

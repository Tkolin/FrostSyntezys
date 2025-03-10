<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $table = 'role_user';

    // Если в таблице нет полей created_at/updated_at
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'role_key'
    ];
}

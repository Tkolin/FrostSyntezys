<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Добавьте эту строку

class Location extends Model
{
    use SoftDeletes; // Добавьте эту строку

    protected $table = 'locations';

    protected $casts = [
        'x' => 'float',
        'y' => 'float'
    ];

    protected $fillable = [
        'id',
        'x',
        'y',
        'name'
    ];

    public function installed_thermistor_chains()
    {
        return $this->hasMany(InstalledThermistorChain::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($location) {
            // Удаляем все связанные записи
            $location->installed_thermistor_chains()->delete();
        });
    }
}
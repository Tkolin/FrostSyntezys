<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class Location extends Model
{
    protected $table = 'locations';

    protected $casts = [
        'x'                 => 'float',
        'y'                 => 'float',
        'main_location_id'  => 'integer',
        'sub_location_ids'  => 'array',
    ];

    protected $fillable = [
        'x',
        'y',
        'name',
        'main_location_id',
        'sub_location_ids',
    ];

    // Автоматически добавляем атрибут sub_location_ids в JSON-вывод
    protected $appends = ['sub_location_ids'];

    /* ========== Relations ========== */

    public function main_location()
    {
        return $this->belongsTo(Location::class, 'main_location_id');
    }

    public function sub_locations()
    {
        return $this->hasMany(Location::class, 'main_location_id');
    }

    public function installed_thermistor_chains()
    {
        return $this->hasMany(InstalledThermistorChain::class);
    }

    /* ========== Accessors ========== */

    /**
     * Возвращает массив ID дочерних локаций.
     */
    public function getSubLocationIdsAttribute(): array
    {
        // Если relation ещё не загружена — загрузим
        if (! $this->relationLoaded('sub_locations')) {
            $this->load('sub_locations');
        }
        return $this->sub_locations->pluck('id')->toArray();
    }
}

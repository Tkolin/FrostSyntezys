<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

/**
 * Class Notification
 *
 * @property int $id
 * @property int $metering_thermistor_chain_point_id
 * @property string $type_notification_key
 * @property string $description
 * @property Carbon $date_start
 * @property Carbon|null $date_end
 * @property int|null $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property MeteringThermistorChainPoint|null $metering_thermistor_chain_point
 * @property Location|null $location
 * @property ThermistorChain|null $thermistor_chain
 */
class Notification extends Model
{
    protected $table = 'notifications';

    protected $casts = [
        'id' => 'int',
        'metering_thermistor_chain_point_id' => 'int',
        'type_notification_key' => 'string',
        'date_start' => 'datetime',
        'date_end' => 'datetime',
        'user_id' => 'int',
    ];

    protected $fillable = [
        'id',
        'metering_thermistor_chain_point_id',
        'type_notification_key',
        'description',
        'date_start',
        'date_end',
        'user_id'
    ];

    /**
     * Отношение к точке измерения термокосы
     */
    public function metering_thermistor_chain_point(): BelongsTo
    {
        return $this->belongsTo(MeteringThermistorChainPoint::class, 'metering_thermistor_chain_point_id');
    }

    /**
     * Получение локации через точку измерения термокосы
     */
    public function location(): HasOneThrough
    {
        return $this->hasOneThrough(
            Location::class,
            InstalledThermistorChain::class,
            'id', // ID термокосы
            'id', // ID локации
            'metering_thermistor_chain_point_id', // внешний ключ в таблице точек измерения
            'location_id' // внешний ключ в таблице термокос
        );
    }

    /**
     * Получение термокосы через точку измерения термокосы
     */
    public function thermistor_chain(): HasOneThrough
    {
        return $this->hasOneThrough(
            ThermistorChain::class,
            InstalledThermistorChain::class,
            'id', // ID термокосы
            'id', // ID термисторной цепи
            'metering_thermistor_chain_point_id', // внешний ключ в таблице точек измерения
            'thermistor_chain_id' // внешний ключ в таблице термокос
        );
    }
}

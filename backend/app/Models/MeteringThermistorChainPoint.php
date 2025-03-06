<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class MeteringThermistorChainPoint extends Model
{
    protected $table = 'metering_thermistor_chain_points';

    protected $casts = [
        'metering_thermistor_chain_id' => 'int',
        'installed_thermistor_chain_point_id' => 'int',
        'value' => 'float',
        'unit_id' => 'int'
    ];

    protected $fillable = [
        'id',
        'metering_thermistor_chain_id',
        'installed_thermistor_chain_point_id',
        'value',
        'unit_id'
    ];

    public function metering_thermistor_chain()
    {
        return $this->belongsTo(MeteringThermistorChain::class);
    }

    // Убедитесь, что здесь используется правильная модель, содержащая пороговые значения
    public function installed_thermistor_chain()
    {
        return $this->belongsTo(InstalledThermistorChain::class);
    }

    protected static function booted()
    {
        static::created(function ($point) {
            // Получаем связанную модель, где хранятся пороговые значения.
            // Если пороги находятся в другой модели (например, InstalledThermistorChainPoint), то измените отношение и вызов соответственно.
            $installedChain = $point->installed_thermistor_chain;

            if ($installedChain) {
                // Проверяем, выходит ли значение за установленные пределы.
                // Здесь предполагается, что в модели InstalledThermistorChain (или другой нужной) определены
                // свойства min_warning_temperature и max_warning_temperature.
                if ($point->value < $installedChain->min_warning_temperature ||
                    $point->value > $installedChain->max_warning_temperature) {

                    \App\Models\Notification::create([
                        'metering_thermistor_chain_point_id' => $point->id,
                        'description' => "Замер {$point->value} выходит за пределы допустимого диапазона ({$installedChain->min_warning_temperature} - {$installedChain->max_warning_temperature})",
                        'type_notification_key' => now(),
                        'date_start' => now(),
                        'date_end' => null,
                        'user_id' => null, // При необходимости можно указать пользователя
                    ]);
                }
            }
        });
    }
}

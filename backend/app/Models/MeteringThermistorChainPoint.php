<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

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

    public function installed_thermistor_chain_point()
    {
        return $this->belongsTo(InstalledThermistorChainPoint::class);
    }

protected static function booted()
{
    static::created(function ($point) {
        Log::info("Новая точка замера создана", [
            'point'    => $point,
            'point_id' => $point->id,
            'value'    => $point->value,
        ]);

        // Получаем связанную модель, где хранятся пороговые значения.
        $installedChain = $point->installed_thermistor_chain_point ?? $point->installed_thermistor_chain;

        if ($installedChain) {
            Log::info("Связанная цепь найдена", [
                'installed_chain_id'        => $installedChain->id,
                'min_warning_temperature'   => $installedChain->min_warning_temperature,
                'max_warning_temperature'   => $installedChain->max_warning_temperature,
                'min_critical_temperature'  => $installedChain->min_critical_temperature,
                'max_critical_temperature'  => $installedChain->max_critical_temperature,
            ]);

            $type_notification_key = null;
            $description = null;

            // Сначала проверяем критические пороги.
            if ($point->value < $installedChain->min_critical_temperature) {
                $type_notification_key = 'DANGER';
                $description = "Температура в точке ({$point->value}) опустилась ниже критического порога ({$installedChain->min_critical_temperature}).";
            } elseif ($point->value > $installedChain->max_critical_temperature) {
                $type_notification_key = 'DANGER';
                $description = "Температура в точке ({$point->value}) поднялась выше критического порога ({$installedChain->max_critical_temperature}).";
            }
            // Затем проверяем предупреждающие пороги.
            elseif ($point->value < $installedChain->min_warning_temperature) {
                $type_notification_key = 'WARNING';
                $description = "Температура в точке ({$point->value}) опустилась ниже предупреждающего порога ({$installedChain->min_warning_temperature}).";
            } elseif ($point->value > $installedChain->max_warning_temperature) {
                $type_notification_key = 'WARNING';
                $description = "Температура в точке ({$point->value}) поднялась выше предупреждающего порога ({$installedChain->max_warning_temperature}).";
            }

            // Если есть уведомление, создаём его.
            if (isset($type_notification_key) && isset($description)) {
                Log::info("Уведомление создано для точки замера", ['type_notification_key' => $type_notification_key,'description'=> $description ]);
                \App\Models\Notification::create([
                    'metering_thermistor_chain_point_id' => $point->id,
                    'description'                        => $description,
                    'type_notification_key'              => $type_notification_key,
                    'date_start'                         => now(),
                    'date_end'                           => null,
                    'user_id'                            => null,
                ]);

                Log::info("Уведомление создано для точки замера", ['point_id' => $point->id]);
            } else {
                Log::info("Значение точки в пределах допустимого диапазона", ['point_value' => $point->value]);
            }
        } else {
            Log::error("Связанная цепь не найдена для точки замера", ['point_id' => $point->id]);
        }
    });


    }
}

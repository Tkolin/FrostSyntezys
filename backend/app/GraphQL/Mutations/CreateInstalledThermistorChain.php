<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\InstalledThermistorChain;
use App\Models\ThermistorChain;
use App\Models\InstalledThermistorChainPoint;

final readonly class CreateInstalledThermistorChain
{
    /** @param array{} $args */
    public function __invoke(null $_, array $args)
    {
        // Логируем ID цепи термисторов
        error_log("1");
        error_log("thermistor_chain_id: " . $args["thermistor_chain_id"]);

        // Ищем термисторную цепь по переданному ID
        $thermistor_chain = ThermistorChain::find($args["thermistor_chain_id"]);
        if (!$thermistor_chain) {
            error_log("ThermistorChain not found.");
            throw new \Exception("ThermistorChain not found");
        }
        error_log("2");
        error_log("ThermistorChain found: " . json_encode($thermistor_chain));

        // Создаем запись установленной термисторной цепи
        $chain = InstalledThermistorChain::create($args);
        
        error_log("3");
        error_log("InstalledThermistorChain new: " . json_encode($chain));
        // Получаем шаг глубины и количество точек из найденной термисторной цепи
        $deep_step = $thermistor_chain->point_step;
        $point_count = $thermistor_chain->point_count;

        // Создаем точки цепи с вычислением глубины для каждой точки
        for ($i = 1; $i <= $point_count; $i++) {
            error_log("3.".json_encode($i));
            error_log("chain[id]: " . json_encode($chain["id"]));

            $chain_point_data = [
                'deep' => (($i - 1) * $deep_step),
                'min_warning_temperature'  => $args["min_warning_temperature"],
                'max_warning_temperature'  => $args["max_warning_temperature"],
                'min_critical_temperature' => $args["min_critical_temperature"],
                'max_critical_temperature' => $args["max_critical_temperature"],
                'installed_thermistor_chains_id' => $chain->id, // связываем точку с установленной цепью
            ];
                        error_log("chain_point_data: " . json_encode($chain_point_data));

             InstalledThermistorChainPoint::create($chain_point_data);
        }

        error_log("4");
        error_log("InstalledThermistorChain created: " . json_encode($chain));
        // Возвращаем созданную цепь (можно вернуть и объект, и true, в зависимости от требований)
        return $chain;
    }
}

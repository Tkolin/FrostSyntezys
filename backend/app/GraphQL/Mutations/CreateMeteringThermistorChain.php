<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\InstalledThermistorChainPoint;
use App\Models\MeteringThermistorChain;
use App\Models\MeteringThermistorChainPoint;

final readonly class CreateMeteringThermistorChain
{
    /**
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        // Ожидаемые входные данные:
        // installed_thermistor_chains_id: ID
        // date_metering: String
        // metering_thermistor_chain_points: [MeteringThermistorChainPointInput!]!
        //      installed_thermistor_chains_point_id: ID
        //      value: Float

        // Формируем данные для создания цепи замеров
        $chainData = [
            'installed_thermistor_chains_id' => $args['installed_thermistor_chains_id'],
            'date_metering' => $args['date_metering'],
        ];

        // Создаем запись цепи замеров
        $meteringChain = MeteringThermistorChain::create($chainData);

        // Получаем данные по точкам замеров
        $pointsData = $args['metering_thermistor_chain_points'];

        // Для каждой точки создаем запись с замером
        foreach ($pointsData as $meteringPoint) {
             $pointData = [
                'metering_thermistor_chain_id'       => $meteringChain->id,
                'installed_thermistor_chain_point_id' => $meteringPoint['installed_thermistor_chains_point_id'],
                'value'                               => $meteringPoint['value'],
                'unit_id'                             => 3, // В данном примере unit_id фиксирован
            ];
            MeteringThermistorChainPoint::create($pointData);
        }

        return $meteringChain;
    }
}

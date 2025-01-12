<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\MeteringThermistorChainPoint;

class MeteringThermistorChainPointFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MeteringThermistorChainPoint::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'metering_thermistor_chain_id' => $this->faker->word(),
            'value' => $this->faker->word(),
        ];
    }
}

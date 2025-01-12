<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\MeteringThermistorChain;

class MeteringThermistorChainFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = MeteringThermistorChain::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'installed_thermistor_chains_id' => $this->faker->word(),
            'date_metering' => $this->faker->word(),
        ];
    }
}

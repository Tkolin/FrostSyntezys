<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\InstalledThermistorChain;

class InstalledThermistorChainFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InstalledThermistorChain::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'thermistor_chain_id' => $this->faker->word(),
            'location_id' => $this->faker->word(),
        ];
    }
}

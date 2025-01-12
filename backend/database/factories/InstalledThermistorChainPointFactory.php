<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\InstalledThermistorChainPoint;

class InstalledThermistorChainPointFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = InstalledThermistorChainPoint::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'installed_thermistor_chains_id' => $this->faker->word(),
            'deep' => $this->faker->word(),
        ];
    }
}

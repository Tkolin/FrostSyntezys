<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\ThermistorChain;

class ThermistorChainFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ThermistorChain::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'model' => $this->faker->word(),
            'name' => $this->faker->name(),
        ];
    }
}

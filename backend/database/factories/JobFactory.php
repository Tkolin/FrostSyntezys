<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Job;

class JobFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Job::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'queue' => $this->faker->word(),
            'payload' => $this->faker->word(),
            'attempts' => $this->faker->word(),
            'reserved_at' => $this->faker->word(),
            'available_at' => $this->faker->word(),
        ];
    }
}

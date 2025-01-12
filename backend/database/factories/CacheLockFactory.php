<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\CacheLock;

class CacheLockFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CacheLock::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'owner' => $this->faker->word(),
            'expiration' => $this->faker->word(),
        ];
    }
}

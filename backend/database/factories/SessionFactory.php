<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Session;

class SessionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Session::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->word(),
            'ip_address' => $this->faker->word(),
            'user_agent' => $this->faker->word(),
            'payload' => $this->faker->word(),
            'last_activity' => $this->faker->word(),
        ];
    }
}

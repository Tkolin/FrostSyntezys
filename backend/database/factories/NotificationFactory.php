<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Notification;

class NotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'installed_thermistor_chains_id' => $this->faker->word(),
            'description' => $this->faker->text(),
            'date_start' => $this->faker->word(),
            'date_end' => $this->faker->word(),
            'user_id' => $this->faker->word(),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\JobBatch;

class JobBatchFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = JobBatch::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'total_jobs' => $this->faker->word(),
            'pending_jobs' => $this->faker->word(),
            'failed_jobs' => $this->faker->word(),
            'failed_job_ids' => $this->faker->word(),
            'options' => $this->faker->word(),
            'cancelled_at' => $this->faker->word(),
            'finished_at' => $this->faker->word(),
        ];
    }
}

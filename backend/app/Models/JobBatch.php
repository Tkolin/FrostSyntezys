<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class JobBatch
 * 
 * @property string $id
 * @property string $name
 * @property int $total_jobs
 * @property int $pending_jobs
 * @property int $failed_jobs
 * @property string $failed_job_ids
 * @property string|null $options
 * @property Carbon|null $cancelled_at
 * @property Carbon $created_at
 * @property Carbon|null $finished_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class JobBatch extends Model
{
	protected $table = 'job_batches';

	protected $casts = [
		'total_jobs' => 'int',
		'pending_jobs' => 'int',
		'failed_jobs' => 'int',
		'cancelled_at' => 'datetime',
		'finished_at' => 'datetime'
	];

	protected $fillable = [	'id',
		'name',
		'total_jobs',
		'pending_jobs',
		'failed_jobs',
		'failed_job_ids',
		'options',
		'cancelled_at',
		'finished_at'
	];
}

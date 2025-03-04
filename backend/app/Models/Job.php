<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Job
 * 
 * @property int $id
 * @property string $queue
 * @property string $payload
 * @property int $attempts
 * @property Carbon|null $reserved_at
 * @property Carbon $available_at
 * @property Carbon $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Job extends Model
{
	protected $table = 'jobs';

	protected $casts = [
		'attempts' => 'int',
		'reserved_at' => 'datetime',
		'available_at' => 'datetime'
	];

	protected $fillable = [	'id',
		'queue',
		'payload',
		'attempts',
		'reserved_at',
		'available_at'
	];
}

<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Notification
 * 
 * @property int $id
 * @property int $installed_thermistor_chains_id
 * @property string $description
 * @property Carbon $date_start
 * @property Carbon|null $date_end
 * @property int|null $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property InstalledThermistorChain $installed_thermistor_chain
 *
 * @package App\Models
 */
class Notification extends Model
{
	protected $table = 'notifications';

	protected $casts = [
		'installed_thermistor_chains_id' => 'int',
		'date_start' => 'datetime',
		'date_end' => 'datetime',
		'user_id' => 'int'
	];

	protected $fillable = [	'id',
		'installed_thermistor_chains_id',
		'description',
		'date_start',
		'date_end',
		'user_id'
	];

	public function installed_thermistor_chain()
	{
		return $this->belongsTo(InstalledThermistorChain::class, 'installed_thermistor_chains_id');
	}
}

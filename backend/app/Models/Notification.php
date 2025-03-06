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
        'id' => 'int',
		'metering_thermistor_chain_point_id' => 'int',
		'date_start' => 'datetime',
		'date_end' => 'datetime',
		'type_notification_key' => 'string',
		'user_id' => 'int'
	];

	protected $fillable = [
        'id',
		'metering_thermistor_chain_point_id',
		'description',
		'date_start',
		'date_end',
		'type_notification_key',
		'user_id'
	];

	public function metering_thermistor_chain_points()
	{
		return $this->belongsTo(MeteringThermistorChainPoint::class, 'metering_thermistor_chain_point_id');
	}
}

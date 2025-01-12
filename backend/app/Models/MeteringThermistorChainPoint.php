<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MeteringThermistorChainPoint
 * 
 * @property int $id
 * @property int $metering_thermistor_chain_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property MeteringThermistorChain $metering_thermistor_chain
 *
 * @package App\Models
 */
class MeteringThermistorChainPoint extends Model
{
	protected $table = 'metering_thermistor_chain_points';

	protected $casts = [
		'metering_thermistor_chain_id' => 'int'
	];

	protected $fillable = [
		'metering_thermistor_chain_id'
	];

	public function metering_thermistor_chain()
	{
		return $this->belongsTo(MeteringThermistorChain::class);
	}
}

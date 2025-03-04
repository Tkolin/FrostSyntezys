<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MeteringThermistorChain
 * 
 * @property int $id
 * @property int $installed_thermistor_chains_id
 * @property Carbon|null $date_metering
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property InstalledThermistorChain $installed_thermistor_chain
 * @property Collection|MeteringThermistorChainPoint[] $metering_thermistor_chain_points
 *
 * @package App\Models
 */
class MeteringThermistorChain extends Model
{
	protected $table = 'metering_thermistor_chains';

	protected $casts = [
		'installed_thermistor_chains_id' => 'int',
		'date_metering' => 'datetime'
	];

	protected $fillable = [	'id',
		'installed_thermistor_chains_id',
		'date_metering'
	];

	public function installed_thermistor_chain()
	{
		return $this->belongsTo(InstalledThermistorChain::class, 'installed_thermistor_chains_id');
	}

	public function metering_thermistor_chain_points()
	{
		return $this->hasMany(MeteringThermistorChainPoint::class);
	}
}

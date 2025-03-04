<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class InstalledThermistorChain
 * 
 * @property int $id
 * @property int $thermistor_chain_id
 * @property int $location_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property float|null $min_warning_temperature
 * @property float|null $max_warning_temperature
 * @property float|null $min_critical_temperature
 * @property float|null $max_critical_temperature
 * 
 * @property ThermistorChain $thermistor_chain
 * @property Location $location
 * @property Collection|InstalledThermistorChainPoint[] $installed_thermistor_chain_points
 * @property Collection|MeteringThermistorChain[] $metering_thermistor_chains
 * @property Collection|Notification[] $notifications
 *
 * @package App\Models
 */
class InstalledThermistorChain extends Model
{
	protected $table = 'installed_thermistor_chains';

 
	protected $fillable = [
		'id',
		'thermistor_chain_id',
		'location_id',
		'min_warning_temperature',
		'max_warning_temperature',
		'min_critical_temperature',
		'max_critical_temperature'
	];

	public function thermistor_chain()
	{
		return $this->belongsTo(ThermistorChain::class);
	}

	public function location()
	{
		return $this->belongsTo(Location::class);
	}

	public function installed_thermistor_chain_points()
	{
		return $this->hasMany(InstalledThermistorChainPoint::class, 'installed_thermistor_chains_id');
	}

	public function metering_thermistor_chains()
	{
		return $this->hasMany(MeteringThermistorChain::class, 'installed_thermistor_chains_id');
	}

	public function notifications()
	{
		return $this->hasMany(Notification::class, 'installed_thermistor_chains_id');
	}
 
}

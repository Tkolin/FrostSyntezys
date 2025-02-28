<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class InstalledThermistorChainPoint
 * 
 * @property int $installed_thermistor_chains_id
 * @property int $id
 * @property float|null $deep
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property float|null $min_warning_temperature
 * @property float|null $max_warning_temperature
 * @property float|null $min_critical_temperature
 * @property float|null $max_critical_temperature
 * 
 * @property InstalledThermistorChain $installed_thermistor_chain
 *
 * @package App\Models
 */
class InstalledThermistorChainPoint extends Model
{
	protected $table = 'installed_thermistor_chain_points';

	protected $casts = [
		'installed_thermistor_chains_id' => 'int',
		'deep' => 'float',
		'min_warning_temperature' => 'float',
		'max_warning_temperature' => 'float',
		'min_critical_temperature' => 'float',
		'max_critical_temperature' => 'float'
	];

	protected $fillable = [
		'installed_thermistor_chains_id',
		'deep',
		'min_warning_temperature',
		'max_warning_temperature',
		'min_critical_temperature',
		'max_critical_temperature'
	];

	public function installed_thermistor_chain()
	{
		return $this->belongsTo(InstalledThermistorChain::class, 'installed_thermistor_chains_id');
	}
}

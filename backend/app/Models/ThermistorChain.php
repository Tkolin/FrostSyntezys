<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ThermistorChain
 * 
 * @property int $id
 * @property string|null $number
 * @property string|null $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $point_count
 * @property float|null $point_step
 * @property int|null $measurement_range
 * @property float|null $error_margin
 * @property float|null $measurement_discreteness
 * @property int|null $sensor_count
 * @property float|null $sensor_distance
 * @property string|null $external_interfaces
 * @property string|null $additional_interfaces
 * @property string|null $memory_type
 * @property string|null $antenna_type
 * @property string|null $battery_type
 * @property int|null $battery_count
 * @property string|null $dimensions
 * 
 * @property Collection|InstalledThermistorChain[] $installed_thermistor_chains
 *
 * @package App\Models
 */
class ThermistorChain extends Model
{
	protected $table = 'thermistor_chains';

	protected $casts = [
		'id' => 'int',
		'point_count' => 'int',
		'point_step' => 'float',
		'measurement_range' => 'int',
		'error_margin' => 'float',
		'measurement_discreteness' => 'float',
		'sensor_count' => 'int',
		'sensor_distance' => 'float',
		'battery_count' => 'int'
	];

	protected $fillable = [	'id',
		'number',
		'name',
		'point_count',
		'point_step',
		'measurement_range',
		'error_margin',
		'measurement_discreteness',
		'sensor_count',
		'sensor_distance',
		'external_interfaces',
		'additional_interfaces',
		'memory_type',
		'antenna_type',
		'battery_type',
		'battery_count',
		'dimensions'
	];

	public function installed_thermistor_chains()
	{
		return $this->hasMany(InstalledThermistorChain::class);
	}
}

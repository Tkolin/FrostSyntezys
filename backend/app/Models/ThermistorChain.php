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
 * 
 * @property Collection|InstalledThermistorChain[] $installed_thermistor_chains
 *
 * @package App\Models
 */
class ThermistorChain extends Model
{
	protected $table = 'thermistor_chains';
	public $incrementing = false;

	protected $casts = [
		'id' => 'int',
		'point_count' => 'int',
		'point_step' => 'float'
	];

	protected $fillable = [
		'number',
		'name',
		'point_count',
		'point_step'
	];

	public function installed_thermistor_chains()
	{
		return $this->hasMany(InstalledThermistorChain::class);
	}
}

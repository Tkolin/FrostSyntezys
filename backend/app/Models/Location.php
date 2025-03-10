<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Location
 *
 * @property int $id
 * @property float|null $x
 * @property float|null $y
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $name
 *
 * @property Collection|InstalledThermistorChain[] $installed_thermistor_chains
 *
 * @package App\Models
 */
class Location extends Model
{
	protected $table = 'locations';

	protected $casts = [
		'x' => 'float',
		'x' => 'float',
		'name' => 'string'
	];

	protected $fillable = [	'id',
		'x',
		'y',
		'name'
	];

	public function installed_thermistor_chains()
	{
		return $this->hasMany(InstalledThermistorChain::class);
	}
}

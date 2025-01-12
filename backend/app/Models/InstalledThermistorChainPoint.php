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
		'deep' => 'float'
	];

	protected $fillable = [
		'installed_thermistor_chains_id',
		'deep'
	];

	public function installed_thermistor_chain()
	{
		return $this->belongsTo(InstalledThermistorChain::class, 'installed_thermistor_chains_id');
	}
}

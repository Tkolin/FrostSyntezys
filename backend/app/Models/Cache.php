<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Cache
 * 
 * @property string $key
 * @property string $value
 * @property Carbon $expiration
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Cache extends Model
{
	protected $table = 'cache';
	protected $primaryKey = 'key';
	public $incrementing = false;

	protected $casts = [
		'expiration' => 'datetime'
	];

	protected $fillable = [
		'value',
		'expiration'
	];
	// В App\Models\ThermistorChain.php
public function scopeApplyFilters(Builder $query, array $filters)
{
    if (!empty($filters['name'])) {
        $query->where('name', 'like', '%' . $filters['name'] . '%');
    }
    // Добавьте другие условия фильтрации по необходимости
    return $query;
}

}

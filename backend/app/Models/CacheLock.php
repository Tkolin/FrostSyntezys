<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CacheLock
 * 
 * @property string $key
 * @property string $owner
 * @property Carbon $expiration
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class CacheLock extends Model
{
	protected $table = 'cache_locks';
	protected $primaryKey = 'key';
	public $incrementing = false;

	protected $casts = [
		'expiration' => 'datetime'
	];

	protected $fillable = [
		'owner',
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    protected $fillable = ['name', 'ico', 'image', 'image_small', 'max_money', 'money_per_hour'];

    public function tweets() {
        return $this->belongsToMany('App\Models\Tweet', 'tweet_assignments');
    }

    public function user_houses() {
        return $this->hasMany('App\Models\UserHouse');
    }

    public function getMoneyPerHourTextAttribute() {
        return number_format($this->money_per_hour, 0, '.', '.');
    }
	
    public function getMaxMoneyTextAttribute() {
        return number_format($this->max_money, 0, '.', '.');
    }
}

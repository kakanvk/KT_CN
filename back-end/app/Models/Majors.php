<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Majors extends Model
{
    protected $primaryKey = 'id_major';

    protected $table = 'majors';

    protected $fillable = [
        'name_vi',
        'name_en',
    ];
}
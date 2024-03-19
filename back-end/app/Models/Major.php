<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    protected $primaryKey = 'id_major';

    protected $table = 'majors';

    protected $fillable = [
        'name_vi',
        'name_en',
    ];
}

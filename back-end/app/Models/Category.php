<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Category extends Model
{
    protected $primaryKey = 'id_category';

    protected $table = 'categories';

    protected $fillable = [
        'name_en',
        'name_vi',
    ];
}
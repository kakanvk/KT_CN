<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Scientific_article extends Model
{
    protected $primaryKey = 'id_scientific_article';

    protected $table = 'scientific_article';

    protected $fillable = [
        'title',
        'publication_date',
        'publishers',
        'abstract',
        'link',
    ];
}
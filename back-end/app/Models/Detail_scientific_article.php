<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail_scientific_article extends Model
{
    protected $table = 'detail_scientific_article';
    protected $fillable = [
        'id_scientific',
        'id_teacher',
    ];

    public function majors()
    {
        return $this->belongsTo(Scientific_article::class, 'id_scientific', 'id_scientific');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'id_teacher', 'id_teacher');
    }
}

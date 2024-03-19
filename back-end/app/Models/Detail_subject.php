<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail_subject extends Model
{
    protected $table = 'detail_subject';

    protected $fillable = [
        'id_major',
        'id_teacher',
    ];

    public function majors()
    {
        return $this->belongsTo(Subject::class, 'id_major', 'id_major');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'id_teacher', 'id_teacher');
    }
}

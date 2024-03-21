<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail_subject extends Model
{
    protected $table = 'detail_subject';

    protected $fillable = [
        'id_subject',
        'id_teacher',
    ];

    public function majors()
    {
        return $this->belongsTo(Subject::class, 'id_subject', 'id_subject');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'id_teacher', 'id_teacher');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail_work_process extends Model
{
    protected $table = 'detail_work_process';
    protected $fillable = [
        'id_work_process',
        'id_teacher',
    ];

    public function WorkProcess()
    {
        return $this->belongsTo(Work_process::class, 'id_work_process', 'id_work_process');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'id_teacher', 'id_teacher');
    }
}

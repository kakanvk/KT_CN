<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $table = 'teachers'; // Tên của bảng trong cơ sở dữ liệu

    protected $primaryKey = 'id_teacher'; // Tên của cột khóa chính

    protected $fillable = [
        'id_work_process',
        'name_teacher',
        'email',
        'phone',
        'position',
        'academic_title',
        'language',
        'research_group',
        'degree',
        'research_area',
        'unit',
        'gg_site',
        'gg_scholar',
        'address'
    ];

    // Xác định mối quan hệ với các model khác
    public function work_process()
    {
        return $this->belongsTo(Work_process::class, 'id_work_process');
    }

}
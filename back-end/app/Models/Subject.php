<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $table = 'subjects'; // Tên của bảng trong cơ sở dữ liệu

    protected $primaryKey = 'id_subject'; // Tên của cột khóa chính

    protected $fillable = [
        'id_subject',
        'id_major',
        'name_vi',
        'name_en',
        'study_object',
        'beginning_year',
        'institutions',
    ];

    public function majors()
    {
        return $this->belongsTo(Major::class, 'id_major');
    }
}
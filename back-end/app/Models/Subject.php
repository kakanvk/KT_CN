<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $table = 'program'; // Tên của bảng trong cơ sở dữ liệu

    protected $primaryKey = 'id_program'; // Tên của cột khóa chính

    protected $fillable = [
        'id_major',
        'name_vi',
        'name_en',
        'study_object',
        'beginning_year',
        'institutions',
    ];

    public function majors()
    {
        return $this->belongsTo(Majors::class, 'id_major');
    }
}
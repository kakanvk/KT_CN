<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $table = 'program'; // Tên của bảng trong cơ sở dữ liệu

    protected $primaryKey = 'id_program'; // Tên của cột khóa chính

    protected $fillable = [
        'id_user',
        'id_major',
        'name_program',
        'content',
        'status',
    ];

    // Xác định mối quan hệ với các model khác
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function majors()
    {
        return $this->belongsTo(Majors::class, 'id_major');
    }
}
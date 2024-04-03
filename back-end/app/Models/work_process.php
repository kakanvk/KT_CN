<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Work_process extends Model
{
    protected $primaryKey = 'id_work_process';

    protected $table = 'work_process';

    protected $fillable = [
        'time',
        'academic_institution',
        'address',
        'position',
    ];
}
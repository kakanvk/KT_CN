<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $table = 'program';

    protected $primaryKey = 'id_program';

    protected $fillable = [
        'id_user',
        'id_major',
        'content',
        'name_program',
    ];
}

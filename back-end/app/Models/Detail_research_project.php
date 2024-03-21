<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Detail_research_project extends Model
{
    protected $table = 'detail_research_project';
    protected $fillable = [
        'id_research_project',
        'id_teacher',
    ];

    public function majors()
    {
        return $this->belongsTo(Research_projects::class, 'id_research_project', 'id_research_project');
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class, 'id_teacher', 'id_teacher');
    }
}

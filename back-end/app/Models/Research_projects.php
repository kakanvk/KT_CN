<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Research_projects extends Model
{
    protected $primaryKey = 'id_research_project';

    protected $table = 'research_projects';

    protected $fillable = [
        'title',
        'status_date',
        'investigator',
        'status',
        'link',
    ];
}
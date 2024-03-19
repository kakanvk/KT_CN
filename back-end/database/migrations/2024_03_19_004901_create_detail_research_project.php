<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_research_project', function (Blueprint $table) {
            $table->unsignedBigInteger('id_research_project');
            $table->unsignedBigInteger('id_teacher');
            $table->foreign('id_research_project')->references('id_research_project')->on('research_projects')->onDelete('cascade');
            $table->foreign('id_teacher')->references('id_teacher')->on('teachers')->onDelete('cascade');
            $table->unique(['id_research_project', 'id_teacher']);
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_research_project');
    }
};

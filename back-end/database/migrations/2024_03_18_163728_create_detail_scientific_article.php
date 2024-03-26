<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_scientific_article', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_scientific');
            $table->unsignedBigInteger('id_teacher');
            $table->foreign('id_scientific')->references('id_scientific_article')->on('scientific_article')->onDelete('cascade');
            $table->foreign('id_teacher')->references('id_teacher')->on('teachers')->onDelete('cascade');
            $table->unique(['id_scientific', 'id_teacher']);
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
        Schema::dropIfExists('detail_scientific_article');
    }
};

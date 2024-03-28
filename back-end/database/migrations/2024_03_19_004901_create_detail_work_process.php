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
        Schema::create('detail_work_process', function (Blueprint $table) {
            $table->unsignedBigInteger('id_work_process');
            $table->unsignedBigInteger('id_teacher');
            $table->foreign('id_work_process')->references('id_work_process')->on('work_process')->onDelete('cascade');
            $table->foreign('id_teacher')->references('id_teacher')->on('teachers')->onDelete('cascade');
            $table->unique(['id_work_process', 'id_teacher']);
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
        Schema::dropIfExists('detail_work_process');
    }
};

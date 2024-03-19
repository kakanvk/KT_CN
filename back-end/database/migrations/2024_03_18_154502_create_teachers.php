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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id('id_teacher');
            $table->unsignedBigInteger('id_work_process');
            $table->string('name_teacher', 100);
            $table->string('email')->unique();
            $table->string('phone', 11)->unique();
            $table->string('position');
            $table->string('academic_title')->nullable();
            $table->string('language', 50);
            $table->string('research_group')->nullable();
            $table->string('degree', 100);
            $table->string('research_area')->nullable();
            $table->string('unit')->nullable();
            $table->string('address')->nullable();
            $table->string('gg_site')->nullable();
            $table->string('gg_scholar')->nullable();

            $table->timestamps();
        });

        Schema::table('teachers', function (Blueprint $table) {
            $table->foreign('id_work_process')->references('id_work_process')->on('work_process');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teachers');
    }
};

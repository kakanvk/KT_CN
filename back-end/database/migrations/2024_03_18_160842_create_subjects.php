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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id('id_subject');
            $table->unsignedBigInteger('id_major');
            $table->string('name_vi', 100);
            $table->string('name_en', 100);
            $table->string('study_object', 100);
            $table->smallInteger('beginning_year');
            $table->string('institutions');
            $table->timestamps();
        });

        Schema::table('subjects', function (Blueprint $table) {
            $table->foreign('id_major')->references('id_major')->on('majors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subjects');
    }
};

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
        Schema::create('detail_subject', function (Blueprint $table) {
            $table->unsignedBigInteger('id_subject');
            $table->unsignedBigInteger('id_teacher');
            $table->foreign('id_subject')->references('id_subject')->on('subjects')->onDelete('cascade');
            $table->foreign('id_teacher')->references('id_teacher')->on('teachers')->onDelete('cascade');
            $table->unique(['id_subject', 'id_teacher']);
            $table->timestamps();
        });

        Schema::table('detail_subject', function (Blueprint $table) {

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detail_subject');
    }
};

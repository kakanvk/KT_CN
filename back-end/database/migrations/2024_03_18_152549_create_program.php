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
        Schema::create('program', function (Blueprint $table) {
            $table->id('id_program');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_major');
            $table->string('name_program');
            $table->string('content');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        Schema::table('program', function (Blueprint $table) {
            $table->foreign('id_user')->references('id_user')->on('users');
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
        Schema::dropIfExists('program');
    }
};

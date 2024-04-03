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
        Schema::create('news', function (Blueprint $table) {
            $table->id('id_new'); 
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_category');
            $table->integer('update_by');
            $table->string('title_vi');
            $table->string('title_en');
            $table->text('content_vi')->nullable();
            $table->text('content_en')->nullable();
            $table->integer('view_count')->nullable();
            $table->string('thumbnail')->nullable();
            $table->boolean('status_vi')->default(true);
            $table->boolean('status_en')->default(true);
            $table->boolean('is_deleted')->default(true);
            $table->timestamps();
        });


        Schema::table('news', function (Blueprint $table) {
            $table->foreign('id_user')->references('id_user')->on('users');
            $table->foreign('id_category')->references('id_category')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
};
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlePanierTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_panier', function (Blueprint $table) {
            $table->id();
            $table->integer('quantite');
            $table->float('prix');

            $table->unsignedBigInteger('panier_id');
            $table->foreign('panier_id')->references('id')->on('paniers')->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->references('id')->on('articles')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('article_panier');
    }
}

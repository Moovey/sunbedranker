<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hotel_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->integer('views')->default(0);
            $table->integer('clicks')->default(0);
            $table->integer('comparisons')->default(0);
            $table->decimal('ctr', 5, 2)->nullable()->comment('Click-through rate');
            $table->timestamps();

            $table->unique(['hotel_id', 'date']);
            $table->index(['hotel_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotel_analytics');
    }
};

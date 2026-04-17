<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agoda_hotels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('agoda_hotel_id')->unique();
            $table->unsignedInteger('chain_id')->nullable();
            $table->string('chain_name', 150)->nullable();
            $table->unsignedInteger('brand_id')->nullable();
            $table->string('brand_name', 150)->nullable();
            $table->string('hotel_name', 300);
            $table->string('hotel_formerly_name', 300)->nullable();
            $table->string('hotel_translated_name', 300)->nullable();
            $table->string('addressline1', 500)->nullable();
            $table->string('addressline2', 500)->nullable();
            $table->string('zipcode', 20)->nullable();
            $table->string('city', 150)->nullable();
            $table->string('state', 150)->nullable();
            $table->string('country', 100)->nullable();
            $table->string('countryisocode', 5)->nullable();
            $table->decimal('star_rating', 2, 1)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->text('url')->nullable();
            $table->string('checkin', 20)->nullable();
            $table->string('checkout', 20)->nullable();
            $table->unsignedSmallInteger('numberrooms')->nullable();
            $table->unsignedSmallInteger('numberfloors')->nullable();
            $table->unsignedSmallInteger('yearopened')->nullable();
            $table->unsignedSmallInteger('yearrenovated')->nullable();
            $table->text('photo1')->nullable();
            $table->text('photo2')->nullable();
            $table->text('photo3')->nullable();
            $table->text('photo4')->nullable();
            $table->text('photo5')->nullable();
            $table->text('overview')->nullable();
            $table->decimal('rates_from', 10, 2)->nullable();
            $table->unsignedTinyInteger('continent_id')->nullable();
            $table->string('continent_name', 50)->nullable();
            $table->unsignedInteger('city_id')->nullable();
            $table->unsignedInteger('country_id')->nullable();
            $table->unsignedInteger('number_of_reviews')->default(0);
            $table->decimal('rating_average', 3, 1)->nullable();
            $table->string('rates_currency', 10)->nullable();
            $table->decimal('rates_from_exclusive', 10, 2)->nullable();
            $table->string('accommodation_type', 100)->nullable();

            // Internal fields
            $table->foreignId('promoted_hotel_id')->nullable()->constrained('hotels')->nullOnDelete();
            $table->timestamps();

            // Indexes for search/filter
            $table->index('city');
            $table->index('country');
            $table->index('countryisocode');
            $table->index('star_rating');
            $table->index('city_id');
            $table->index('accommodation_type');
            $table->index('promoted_hotel_id');
            $table->fullText(['hotel_name', 'city', 'country']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agoda_hotels');
    }
};

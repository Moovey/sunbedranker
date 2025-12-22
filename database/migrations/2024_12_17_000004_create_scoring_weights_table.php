<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scoring_weights', function (Blueprint $table) {
            $table->id();
            $table->string('criteria_name')->unique();
            $table->string('display_name');
            $table->decimal('weight', 4, 2)->default(1.00)->comment('Weight in overall score calculation');
            $table->decimal('family_weight', 4, 2)->default(1.00);
            $table->decimal('quiet_weight', 4, 2)->default(1.00);
            $table->decimal('party_weight', 4, 2)->default(1.00);
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->index('criteria_name');
        });

        // Insert default weights
        DB::table('scoring_weights')->insert([
            [
                'criteria_name' => 'sunbed_ratio',
                'display_name' => 'Sunbed to Guest Ratio',
                'weight' => 2.50,
                'family_weight' => 2.00,
                'quiet_weight' => 2.50,
                'party_weight' => 1.50,
                'description' => 'How many sunbeds per guest',
                'is_active' => true,
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'criteria_name' => 'sun_exposure',
                'display_name' => 'Sun Exposure',
                'weight' => 2.00,
                'family_weight' => 1.50,
                'quiet_weight' => 2.00,
                'party_weight' => 2.50,
                'description' => 'How much sun throughout the day',
                'is_active' => true,
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'criteria_name' => 'pool_variety',
                'display_name' => 'Pool Variety & Size',
                'weight' => 1.80,
                'family_weight' => 2.50,
                'quiet_weight' => 1.50,
                'party_weight' => 2.00,
                'description' => 'Number and types of pools',
                'is_active' => true,
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'criteria_name' => 'atmosphere',
                'display_name' => 'Atmosphere & Vibe',
                'weight' => 1.50,
                'family_weight' => 1.80,
                'quiet_weight' => 2.50,
                'party_weight' => 2.50,
                'description' => 'Overall pool atmosphere',
                'is_active' => true,
                'order' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'criteria_name' => 'cleanliness',
                'display_name' => 'Cleanliness & Maintenance',
                'weight' => 1.70,
                'family_weight' => 2.00,
                'quiet_weight' => 1.80,
                'party_weight' => 1.00,
                'description' => 'Pool cleanliness and upkeep',
                'is_active' => true,
                'order' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'criteria_name' => 'family_features',
                'display_name' => 'Family Features',
                'weight' => 1.00,
                'family_weight' => 2.50,
                'quiet_weight' => 0.50,
                'party_weight' => 0.50,
                'description' => 'Kids pools, activities, safety',
                'is_active' => true,
                'order' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('scoring_weights');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add new fields to hotel_claims table
        Schema::table('hotel_claims', function (Blueprint $table) {
            if (!Schema::hasColumn('hotel_claims', 'official_email')) {
                $table->string('official_email')->after('claim_message')->nullable();
            }
            if (!Schema::hasColumn('hotel_claims', 'phone')) {
                $table->string('phone')->after('official_email')->nullable();
            }
            if (!Schema::hasColumn('hotel_claims', 'phone_verified_at')) {
                $table->timestamp('phone_verified_at')->after('phone')->nullable();
            }
            if (!Schema::hasColumn('hotel_claims', 'claimed_at')) {
                $table->timestamp('claimed_at')->after('reviewed_at')->nullable();
            }
            if (!Schema::hasColumn('hotel_claims', 'ip_address')) {
                $table->ipAddress('ip_address')->after('claimed_at')->nullable();
            }
            if (!Schema::hasColumn('hotel_claims', 'last_claim_attempt_at')) {
                $table->timestamp('last_claim_attempt_at')->after('ip_address')->nullable();
            }
            if (!Schema::hasColumn('hotel_claims', 'claim_attempts')) {
                $table->unsignedInteger('claim_attempts')->after('last_claim_attempt_at')->default(0);
            }
        });

        // Add owned_by to hotels table
        Schema::table('hotels', function (Blueprint $table) {
            if (!Schema::hasColumn('hotels', 'owned_by')) {
                $table->foreignId('owned_by')->after('is_featured')->nullable()->constrained('users')->nullOnDelete();
                $table->index('owned_by');
            }
        });
    }

    public function down(): void
    {
        Schema::table('hotel_claims', function (Blueprint $table) {
            $columns = ['official_email', 'phone', 'phone_verified_at', 'claimed_at', 'ip_address', 'last_claim_attempt_at', 'claim_attempts'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('hotel_claims', $column)) {
                    $table->dropColumn($column);
                }
            }
        });

        Schema::table('hotels', function (Blueprint $table) {
            if (Schema::hasColumn('hotels', 'owned_by')) {
                $table->dropForeign(['owned_by']);
                $table->dropColumn('owned_by');
            }
        });
    }
};

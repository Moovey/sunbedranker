<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->string('billing_first_name')->nullable()->after('coupon_code');
            $table->string('billing_last_name')->nullable()->after('billing_first_name');
            $table->string('billing_country')->nullable()->after('billing_last_name');
            $table->string('billing_phone')->nullable()->after('billing_country');
            $table->string('billing_address')->nullable()->after('billing_phone');
            $table->string('billing_city')->nullable()->after('billing_address');
            $table->string('billing_zip')->nullable()->after('billing_city');
        });
    }

    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn([
                'billing_first_name',
                'billing_last_name',
                'billing_country',
                'billing_phone',
                'billing_address',
                'billing_city',
                'billing_zip',
            ]);
        });
    }
};

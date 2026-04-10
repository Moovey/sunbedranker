<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Production readiness fixes:
     * - Missing indexes for query performance
     * - Missing FK constraints
     * - FK cascade fixes
     */
    public function up(): void
    {
        // 1. Subscriptions: missing indexes
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->index('status');
            $table->index(['user_id', 'status']);
        });

        // 2. Reviews: missing user_id index
        Schema::table('reviews', function (Blueprint $table) {
            $table->index('user_id');
        });

        // 3. Posts: missing FK on category_id + indexes
        Schema::table('posts', function (Blueprint $table) {
            $table->index('author_id');
            $table->index('category_id');
            $table->foreign('category_id')
                  ->references('id')
                  ->on('categories')
                  ->nullOnDelete();
        });

        // 4. FK cascade fixes: reviews.moderated_by and hotel_claims.reviewed_by
        Schema::table('reviews', function (Blueprint $table) {
            // Only re-add with nullOnDelete if column exists
            if (Schema::hasColumn('reviews', 'moderated_by')) {
                try {
                    $table->dropForeign(['moderated_by']);
                } catch (\Exception $e) {
                    // FK may not exist yet
                }
                $table->foreign('moderated_by')
                      ->references('id')
                      ->on('users')
                      ->nullOnDelete();
            }
        });

        Schema::table('hotel_claims', function (Blueprint $table) {
            if (Schema::hasColumn('hotel_claims', 'reviewed_by')) {
                try {
                    $table->dropForeign(['reviewed_by']);
                } catch (\Exception $e) {
                    // FK may not exist yet
                }
                $table->foreign('reviewed_by')
                      ->references('id')
                      ->on('users')
                      ->nullOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Each operation in its own try/catch — partial rollbacks may have already removed some
        try {
            Schema::table('subscriptions', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('subscriptions', function (Blueprint $table) {
                $table->dropIndex(['user_id', 'status']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('subscriptions', function (Blueprint $table) {
                $table->dropIndex(['status']);
            });
        } catch (\Exception $e) {}

        // Re-add the original FK from create_subscriptions migration
        try {
            Schema::table('subscriptions', function (Blueprint $table) {
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('reviews', function (Blueprint $table) {
                $table->dropIndex(['user_id']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('posts', function (Blueprint $table) {
                $table->dropForeign(['category_id']);
                $table->dropIndex(['author_id']);
                $table->dropIndex(['category_id']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('reviews', function (Blueprint $table) {
                $table->dropForeign(['moderated_by']);
            });
        } catch (\Exception $e) {}

        try {
            Schema::table('hotel_claims', function (Blueprint $table) {
                $table->dropForeign(['reviewed_by']);
            });
        } catch (\Exception $e) {}
    }
};

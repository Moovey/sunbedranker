<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->createUsers();
    }

    /**
     * Create default users
     */
    private function createUsers(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => env('ADMIN_EMAIL', 'admin@sunbedranker.com'),
                'password' => bcrypt(env('ADMIN_PASSWORD')),
                'role' => 'admin',
            ],
            [
                'name' => 'Test User',
                'email' => env('TEST_USER_EMAIL', 'user@sunbedranker.com'),
                'password' => bcrypt(env('TEST_USER_PASSWORD')),
                'role' => 'user',
            ],
            [
                'name' => 'Hotelier User',
                'email' => env('HOTELIER_EMAIL', 'hotelier@sunbedranker.com'),
                'password' => bcrypt(env('HOTELIER_PASSWORD')),
                'role' => 'hotelier',
            ],
        ];

        foreach ($users as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                array_merge($userData, ['email_verified_at' => now()])
            );
        }
    }
}


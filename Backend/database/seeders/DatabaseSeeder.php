<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // Role comes before User seeder here
        $this->call(RoleTableSeeder::class);
        // User seeder will use the roles above created
        $this->call(UserTableSeeder::class);
    }
}

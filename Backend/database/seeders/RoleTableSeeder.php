<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_admin = new Role();
        $role_admin->nomRole = 'admin';
        $role_admin->save();

        $role_internaute = new Role();
        $role_internaute->nomRole = 'internaute';
        $role_internaute->save();
    }
}

<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User();
        $admin->name = 'Admin';
        $admin->email = 'admin@exemple.com';
        $admin->password = Hash::make('12345678');
        $admin->telephone = '0600000000';

        $role = Role::where('nomRole', 'admin')->first();
        $admin->role_id = $role->id;
       
        $admin->save();
    }
}

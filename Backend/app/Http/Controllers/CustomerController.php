<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function getCustomers()
    {
        $customers = User::where('role_id', '=', 2)->get();
        $responce = [
            'customers' => $customers
        ];
        return response()->json($responce, 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Panier;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'telephone' => $request['telephone'],
            'pays' => $request['pays'],
            'ville' => $request['ville'],
            'adresse' => $request['adresse'],
            'role_id' => 2
        ]);
        $panier = Panier::create(['user_id' => $user->id]);
        $token = $user->createToken('myapptoken')->plainTextToken;
        $responce = [
            'user' => $user,
            'panier' => $panier,
            'token' => $token,
            'status' => 1
        ];

        return \response()->json($responce, 201);
    }
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return \response()->json([
                'message' => 'Email or password is incorrect.',
                'status' => 0

            ]);
        }
        $token = $user->createToken('myapptoken')->plainTextToken;
        $responce = [
            'user' => $user,
            'token' => $token,
            'status' => 1
        ];
        return \response()->json($responce, 200);
    }
    public function logout()
    {
        $user = auth()->user();
        $user()->tokens()->delete();
        return \response()->json(['message' => 'Logout']);
    }
    public function allUsers()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }
}

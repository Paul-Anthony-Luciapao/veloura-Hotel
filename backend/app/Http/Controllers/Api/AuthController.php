<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Handles user registration for the booking app.
    // The frontend sends a POST request with name, email, and password.
    // Laravel validates the input before creating the user record.
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string']
        ]);

        if (! auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Login Successful',
            'data' => ['user' => $user, 'token' => $token,],
        ]);
    }

    public function register(Request $request)
    {
        // Validate incoming data to prevent bad or duplicate user registrations.
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed', 'regex:/[A-Z]/', 'regex:/[^A-Za-z0-9]/'],
        ]);

        // Create the new user record in the database.
        // The password is hashed before saving so it is not stored as plain text.
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'customer', // Default role for new users
        ]);

        // Return a JSON response with a success message and the created user data.
        return response()->json(['message' => 'User registered successfully', 'data' => $user], 201);
    }
}

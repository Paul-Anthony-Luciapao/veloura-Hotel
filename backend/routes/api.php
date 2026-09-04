<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\AuthController;

// Public routes that do not require a logged-in user.
// These are the endpoints a frontend can call without authentication.
Route::get('/users', function () {
    return response()->json(['message' => 'Hello from the Laravel']);
});
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes that require Sanctum authentication.
// The user must be logged in before they can access booking data.
Route::middleware('auth:sanctum')->group(function () {

    // Returns the currently logged-in user.
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Booking endpoints for viewing and creating bookings.
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{booking}', [BookingController::class, 'show']);

    // Cancels a booking by ID.
    Route::patch('/bookings/{booking}/cancel', [
        BookingController::class,
        'cancel'
    ]);
});

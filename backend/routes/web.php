<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Booking API is running',
        'app' => 'my-booking-app',
    ]);
});

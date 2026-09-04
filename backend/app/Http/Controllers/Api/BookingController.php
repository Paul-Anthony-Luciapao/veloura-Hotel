<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
        ]);

        if ($request->start_date === $request->end_date && $request->end_time <= $request->start_time) {
            return response()->json([
                'message' => 'The end time must be after the start time.',
            ], 422);
        }

        $service = Service::findOrFail($request->service_id);

        $conflict = Booking::where('service_id', $request->service_id)
            ->where('status', '!=', 'cancelled')
            ->whereRaw(
                "TIMESTAMP(start_date, start_time) < ? AND TIMESTAMP(end_date, end_time) > ?",
                ["{$request->end_date} {$request->end_time}", "{$request->start_date} {$request->start_time}"]
            )
            ->exists();

        if ($conflict) {
            return response()->json([
                'message' => 'This service is already booked for the selected dates and times.'
            ], 409);
        }

        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'service_id' => $request->service_id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'status' => 'pending',
            'total_price' => $service->price,
        ]);

        return response()->json($booking, 201);
    }
}

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
            'end_date' => 'required|date|after:start_date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
        ]);

        $service = Service::findOrFail($request->service_id);

        $bookedRooms = Booking::where('service_id', $request->service_id)
            ->where('status', '!=', 'cancelled')
            ->where('start_date', '<', $request->end_date)
            ->where('end_date', '>', $request->start_date)
            ->count();

        if ($bookedRooms >= $service->total_rooms) {
            return response()->json([
                'message' => 'This room type is fully booked for the selected dates.'
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

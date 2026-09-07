<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $services = Service::where('is_active', true)
            ->latest()
            ->get();

        if ($request->filled(['start_date', 'end_date'])) {
            $request->validate([
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
            ]);

            $services->each(function (Service $service) use ($request) {
                $bookedRooms = $service->bookings()
                    ->where('status', '!=', 'cancelled')
                    ->where('start_date', '<', $request->end_date)
                    ->where('end_date', '>', $request->start_date)
                    ->count();

                $service->available_rooms = max($service->total_rooms - $bookedRooms, 0);
            });
        }

        return response()->json(['data' => $services]);
    }
    public function show(Service $service)
    {
        return response()->json(['data' => $service]);
    }
}




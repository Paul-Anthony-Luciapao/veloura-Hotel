<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)
            ->latest()
            ->get();

        return response()->json(['data' => $services]);
    }
    public function show(Service $service)
    {
        return response()->json(['data' => $service]);
    }
}




<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    // A booking represents a scheduled appointment made by a user for a service.
    // It stores the exact date, time range, status, and final price for that booking.
    protected $fillable = [
        'user_id',
        'service_id',
        'name',
        'email',
        'phone',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'status',
        'total_price',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_price' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}

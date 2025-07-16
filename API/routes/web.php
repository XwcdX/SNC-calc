<?php

use App\Http\Controllers\Api\SocialiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::fallback(function () {
    if (request()->is('api/*')) {
        return response()->json(['message' => 'Not Found'], 404);
    }

    return redirect('http://localhost:3000');
});

// Route::get('/auth/google/redirect', [SocialiteController::class, 'redirectToGoogle'])->name('login.google');
// Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

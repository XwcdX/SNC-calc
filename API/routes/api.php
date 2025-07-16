<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\ImageUploadController;
use App\Http\Controllers\Api\RiskCalculationController;
// use App\Http\Controllers\Api\SocialiteController;
use App\Http\Controllers\RiskCalculatorController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);
// Route::get('/auth/google/redirect', [SocialiteController::class, 'redirectToGoogle']);
// Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);

// Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/clients', [ClientController::class, 'index']);
    Route::post('/risk-calculations', [RiskCalculationController::class, 'store']);
    Route::post('/calculate-risk', [RiskCalculatorController::class, 'calculate']);
    Route::post('/upload-inspection-image', [ImageUploadController::class, 'store']);
// });
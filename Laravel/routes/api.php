<?php

use App\Http\Controllers\AdminAuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AdminAuthController::class, 'user']);
        Route::post('/logout', [AdminAuthController::class, 'logout']);
    });
});
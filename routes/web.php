<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use \App\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::group(["middleware" => ["auth", "verified"]],function(){
    Route::get("/dashboard", function(){
        return Inertia::render("Dashboard");
    })->name("dashboard");

    Route::get("/todos",[TodoController::class, "index"])->name("todos.index");
    Route::post("/todos",[TodoController::class, "store"])->name("todos.store");
    Route::put("/todos/{id}/complete", [TodoController::class, "complete"])->name("todos.complete");
    Route::put("/todos/{id}/restore", [TodoController::class, "restore"])->name("todos.restore");
    Route::delete("/todos/{id}", [TodoController::class, "destroy"])->name("todos.remove");
});

require __DIR__.'/auth.php';

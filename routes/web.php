<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Mail\WelcomeMail;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

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

Auth::routes(['verify' => true]);



Route::get('/', function () {
    return view('welcome');
});


Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/private', [HomeController::class, 'privatePlace']);

Route::resource('/posts', PostController::class);

Route::get('/addPosts', [HomeController::class, 'index']);
Route::get('/editPost/{id}', [HomeController::class, 'index']);


Route::get('/test', function () {
    return view('form');
});


// Route mail
Route::get('/email', function () {
    Mail::to(auth()->user()->email)->send(new WelcomeMail);
    return new WelcomeMail;
});

<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Article
Route::get('articles', [ArticleController::class, 'getArticles']);
Route::get('article/{id}', [ArticleController::class, 'getOneArticle']);
Route::post('addarticle', [ArticleController::class, 'addArticle']);
Route::put('updatearticle/{id}', [ArticleController::class, 'updateArticle']);
Route::post('saveimage', [ArticleController::class, 'saveImage']);
Route::delete('deletearticle/{id}', [ArticleController::class, 'deleteArticle']);

// Categorie
Route::get('categories', [CategorieController::class, 'getCategories']);
Route::get('categorie/{id}', [CategorieController::class, 'getOneCategorie']);
Route::post('addcategorie', [CategorieController::class, 'addCategorie']);
Route::put('updatecategorie/{id}', [CategorieController::class, 'updateCategorie']);
Route::delete('deletecategorie/{id}', [CategorieController::class, 'deleteCategorie']);

// Transaction
Route::post('addtransaction', [TransactionController::class, 'addTransaction']);
Route::put('updatetransaction/{id}', [TransactionController::class, 'updateTransaction']);
Route::delete('deletetransaction/{id}', [TransactionController::class, 'deleteTransaction']);
Route::get('transactions', [TransactionController::class, 'getTransactions']);
Route::get('transaction/{id}', [TransactionController::class, 'getOneTransaction']);
Route::get('confirmer/{userid}', [TransactionController::class, 'confirmer']);

// Panier
Route::get('panier/{usedid}', [PanierController::class, 'getCart']);
Route::get('addtopanier/{userid}/{articleid}', [PanierController::class, 'addToCart']);
Route::delete('deletefrompanier/{userid}/{articleid}', [PanierController::class, 'deleteFromCart']);
Route::delete('deleteall/{userid}', [PanierController::class, 'deleteAllArticles']);
Route::get('getttc/{userid}', [PanierController::class, 'getPrixItems']);


// Dashboard
Route::get('customersnumber', [DashboardController::class, 'customers']);
Route::get('orders', [DashboardController::class, 'orders']);
Route::get('topsellingproducts', [DashboardController::class, 'topSellingProducts']);
Route::get('topsellingcategories', [DashboardController::class, 'topSellingCategories']);
Route::get('newcustomers', [DashboardController::class, 'newCustomers']);

// Customer
Route::get('customers', [CustomerController::class, 'getCustomers']);

// Sanctum
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('logout', [AuthController::class, 'logout']);

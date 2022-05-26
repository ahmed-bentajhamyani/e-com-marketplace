<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function customers()
    {
        $customers = User::where('role_id', '=', 2)->count();
        $responce = $customers;
        return \response()->json($responce, 200);
    }
    public function orders()
    {
        $orders = Transaction::all();
        $sales = 0;
        $revenue = 0;
        $transactions = DB::table('article_transaction')->get();
        foreach ($orders as $order) {
            $revenue += $order->ttc;
        }
        foreach ($transactions as $transaction) {
            $sales += $transaction->quantite;
        }
        $responce = [
            'orders' => $orders->count(),
            'sales' => $sales,
            'revenue' => $revenue
        ];
        return \response()->json($responce, 200);
    }
    public function topSellingProducts()
    {
        $articles = array();
        $topSellingProducts = Article::leftJoin('article_transaction', 'articles.id', '=', 'article_transaction.article_id')
            ->selectRaw('article_id , sum(article_transaction.quantite) as total')
            ->groupBy('article_id')
            ->orderBy('total','desc')
            ->take(3)
            ->get();
        foreach ($topSellingProducts as $topSellingProduct) {
            $articles[ \count($articles) ] = Article::find( $topSellingProduct->article_id );
        }
        return \response()->json($articles, 200);
    }
    public function topSellingCategories()
    {
        $categories = array();
        $topSellingCategories = Article::leftJoin('article_transaction', 'articles.id', '=', 'article_transaction.article_id')
            ->selectRaw('categorie_id , sum(article_transaction.quantite) as total')
            ->groupBy('categorie_id')
            ->orderBy('total','desc')
            ->take(5)
            ->get();
        foreach ($topSellingCategories as $topSellingCategorie) {
            $categories[ \count($categories) ] = Categorie::find( $topSellingCategorie->categorie_id );
        }
        return \response()->json($categories, 200);
    }
    public function newCustomers() {
        $customers = User::where('role_id', '=', 2)->latest()->limit(4)->get();
        return \response()->json($customers, 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Panier;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function getTransactions()
    {
        $transactions = Transaction::latest()->get();
        return response()->json($transactions, 200);
    }
    public function getOneTransaction($id)
    {
        $transaction = Transaction::find($id);
        if (is_null($transaction)) {
            return response()->json(['message' => 'Transaction Not Found'], 404);
        }
        $article_transactions = DB::table('article_transaction')->where('transaction_id', '=', $transaction->id)->get();
        $articles = array();
        $quantite = 0;
        foreach ($article_transactions as $article_transaction) {
            $articles[count($articles)] = Article::find($article_transaction->article_id);
            $quantite += $article_transaction->quantite;
        }
        $responce = [
            'transaction' => $transaction,
            'articles' => $articles,
            'article_transactions' => $article_transactions,
            'quantite' => $quantite
        ];
        return response()->json($responce, 200);
    }
    public function addTransaction(Request $request)
    {
        $transaction = Transaction::create($request->all());
        return response($transaction, 201);
    }
    public function updateTransaction(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        if (is_null($transaction))
            return response()->json(['message' => 'Transaction Not Found'], 404);

        $transaction->update($request->all());
        return response($transaction, 200);
    }
    public function deleteTransaction($id)
    {
        $transaction = Transaction::find($id);
        if (is_null($transaction))
            return response()->json(['message' => 'Transaction Not Found'], 404);

        $transaction->delete();
        return response(null, 204);
    }
    public function confirmer($id_user)
    {
        $panier = Panier::where('user_id', '=', $id_user)->first();
        $transaction = new Transaction();
        $transaction->ttc = $panier->prixItems + 8.50;
        $transaction->user_id = $id_user;
        $transaction->dateTransaction = date('d-m-y h:i:s');
        $transaction->save();

        // Article_Transation
        $article_paniers = DB::table('article_panier')->get();
        if (count($article_paniers) == 0) {
            return \response()->json(['message' => 'Cart is empty']);
        } else {
            foreach ($article_paniers as $article_panier) {
                if ($article_panier->panier_id == $panier->id) {
                    $article = Article::find($article_panier->article_id);
                    $transaction->articles()->attach($article);
                    DB::table('article_transaction')->where('transaction_id', '=', $transaction->id)->where('article_id', '=', $article->id)->update(['quantite' => $article_panier->quantite, 'prix' => $article_panier->prix]);
                }
            }
            return \response()->json(['message' => 'Delete All From Cart']);
        }

        return \response()->json(['message' => 'Transcation enregistré']);
    }
}

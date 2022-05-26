<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Panier;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class PanierController extends Controller
{
    public function getCart($id_user)
    {
        $panier = Panier::where('user_id', '=', $id_user)->first();
        $article_paniers = DB::table('article_panier')->where('panier_id', '=', $panier->id)->get();

        $responce = [
            'article_paniers' => $article_paniers
        ];
        return \response()->json($responce, 200);
    }
    public function addToCart($id_user, $id_article)
    {
        $notFound = false;
        $panier = Panier::where('user_id', '=', $id_user)->first();
        $article_paniers = DB::table('article_panier')->get();
        $article = Article::find($id_article);
        if (count($article_paniers) == 0) {
            $panier->articles()->attach($article);
            DB::table('article_panier')->where('panier_id', '=', $panier->id)->where('article_id', '=', $article->id)->update(['quantite' => 1, 'prix' => $article->prixUnitaire]);
            $panier->prixItems += $article->prixUnitaire;
        } else {
            foreach ($article_paniers as $article_panier) {
                if ($article_panier->panier_id == $panier->id && $article_panier->article_id == $id_article) {
                    $article_panier->quantite++;
                    $article_panier->prix += $article->prixUnitaire;
                    $panier->prixItems += $article->prixUnitaire;
                    DB::table('article_panier')->where('id', '=', $article_panier->id)->update(['quantite' => ($article_panier->quantite), 'prix' => ($article_panier->prix)]);
                    $notFound = false;
                    break;
                } else {
                    $notFound = true;
                }
            }
            if ( $notFound ) {
                $panier->articles()->attach($article);
                DB::table('article_panier')->where('panier_id', '=', $panier->id)->where('article_id', '=', $article->id)->update(['quantite' => 1, 'prix' => $article->prixUnitaire]);
                $panier->prixItems += $article->prixUnitaire;
            }
        }
        $panier->qteItems++;
        $panier->save();

        return \response()->json(['message' => 'Product added to cart']);
    }
    public function deleteFromCart($id_user, $id_article)
    {
        $panier = Panier::where('user_id', '=', $id_user)->first();
        $article = Article::find($id_article);
        $article_paniers = DB::table('article_panier')->get();
        
        if (count($article_paniers) == 0) {
            return \response()->json(['message' => 'Cart is empty']);
        } else {
            foreach ($article_paniers as $article_panier) {
                if ($article_panier->panier_id == $panier->id) {
                    if ($article_panier->article_id == $id_article) {
                        if ($article_panier->quantite > 1) {
                            $article_panier->quantite--;
                            $article_panier->prix -= $article->prixUnitaire;
                            $panier->prixItems -= $article->prixUnitaire;
                            $panier->qteItems--;
                            $panier->save();
                            DB::table('article_panier')->where('id', '=', $article_panier->id)->update(['quantite' => ($article_panier->quantite), 'prix' => ($article_panier->prix)]);
                            return \response()->json(['message' => 'Product deleted from cart']);
                        } else {
                            DB::table('article_panier')->where('id', '=', $article_panier->id)->delete();
                            $panier->prixItems -= $article->prixUnitaire;
                            $panier->qteItems--;
                            $panier->save();
                            return \response()->json(['message' => 'Product deleted from cart']);
                        }
                    }
                }
            }
            return \response()->json(['message' => 'Cart is empty']);
        }
    }
    public function deleteAllArticles($id_user) {
        $panier = Panier::where('user_id', '=', $id_user)->first();
        $article_paniers = DB::table('article_panier')->get();
        $panier->prixItems = 0;
        $panier->qteItems = 0;
        $panier->save();
        if (count($article_paniers) == 0) {
            return \response()->json(['message' => 'Cart is empty']);
        } else {
            foreach ($article_paniers as $article_panier) {
                if ($article_panier->panier_id == $panier->id) {
                    $article = Article::find($article_panier->article_id);
                    $panier->articles()->detach($article);
                }
            }
            return \response()->json(['message' => 'Delete All From Cart']);
        }
    }
    public function getPrixItems($id_user)
    {
        $panier = Panier::where('user_id', '=', $id_user)->first();
        $ttc = $panier->prixItems;
        return \response()->json(['ttc' => $ttc]);
    }
}

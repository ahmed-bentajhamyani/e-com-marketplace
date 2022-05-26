<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Categorie;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function getArticles(){
        $articles = Article::latest()->get();
        return \response()->json($articles, 200);
    }
    public function getOneArticle($id){
        $article = Article::find($id);
        $categorie = Categorie::find( $article->categorie_id);
        if( is_null($article) )
            return \response()->json(['message' => 'Article Not Found'], 404);

        $responce = [
            'article' => $article,
            'categorie' => $categorie
        ];
        return \response()->json($responce, 200);
    }
    public function addArticle(Request $request){

        $article = new Article();

        $article->nomArticle = $request['nomArticle'];
        $article->description = $request['description'];
        $article->image = $request['image'];
        $article->prixUnitaire = $request['prixUnitaire'];
        $article->qteStock = $request['qteStock'];
        $article->user_id = 1;
        $article->categorie_id = $request['categorie_id'];

        $article->save();

        return \response()->json($article, 201);
    }
    public function updateArticle($id , Request $request){

        $article = Article::find($id);
        if( is_null($article) )
            return \response()->json(['message' => 'Article Not Found'], 404);

        $article->nomArticle = $request['nomArticle'];
        $article->description = $request['description'];
        $article->image = $request['image'];
        $article->prixUnitaire = $request['prixUnitaire'];
        $article->qteStock = $request['qteStock'];
        $article->categorie_id = $request['categorie_id'];
        $article->user_id = 1;

        $article->save();
        return \response()->json($article, 200);
    }
    public function saveImage(Request $request){
        if($request->hasFile('image')){
            $imageNameComplete = $request->file('image')->getClientOriginalName();
            $imageNameOnly = \pathinfo( $imageNameComplete, \PATHINFO_FILENAME);
            $image_name = $imageNameOnly . "." . $request->file('image')->getClientOriginalExtension();
            $path = 'images/articles';
            $request->file('image')->move($path, $image_name);
        }
    }
    public function deleteArticle($id){

        $article = Article::find($id);
        if( is_null($article) )
            return \response()->json(['message' => 'Article Not Found'], 404);

        $article->delete();
        return \response(null, 204);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;

class CategorieController extends Controller
{
    public function getCategories()
    {
        $categories = Categorie::latest()->get();
        return response()->json($categories, 200);
    }
    public function getOneCategorie($id)
    {
        $categorie = Categorie::find($id);
        if (is_null($categorie)) {
            return response()->json(['message' => 'Produit introuvable'], 404);
        }
        return response()->json(Categorie::find($id), 200);
    }
    public function addCategorie(Request $request)
    {
        $categorie = Categorie::create($request->all());
        return response($categorie, 201);
    }
    public function updateCategorie(Request $request, $id)
    {
        $categorie = Categorie::find($id);
        if (is_null($categorie))
            return response()->json(['message' => 'Categorie Not Found'], 404);

        $categorie->update($request->all());
        return response($categorie, 200);
    }
    public function deleteCategorie($id)
    {
        $categorie = Categorie::find($id);
        if (is_null($categorie))
            return response()->json(['message' => 'Categorie Not Found'], 404);

        $categorie->delete();
        return response(null, 204);
    }
}

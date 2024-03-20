<?php

namespace App\Http\Controllers;

use App\Models\Scientific_article;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ScientificArticleController extends Controller
{
    public function getAll()
    {
        $scientificArticles = Scientific_article::all();
        return response()->json(['scientific_articles' => $scientificArticles], 200);
    }

    public function getById($id)
    {
        $scientificArticle = Scientific_article::find($id);
        if (!$scientificArticle) {
            return response()->json(['message' => 'Scientific article not found'], 404);
        }
        return response()->json(['scientific_article' => $scientificArticle], 200);
    }

    public function update(Request $request, $id)
    {

        try {
            $scientificArticle = Scientific_article::find($id);
            if (!$scientificArticle) {
                return response()->json(['message' => 'Scientific article not found'], 404);
            }

            $validatedData = $request->validate([
                'title' => 'required|string',
                'publication_date' => 'nullable|date',
                'publishers' => 'required|string',
                'abstract' => 'required|string',
                'link' => 'nullable|string'
            ]);

            $scientificArticle->update($validatedData);
            return response()->json(['message' => 'Scientific article updated successfully', 'scientific_article' => $scientificArticle], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to updated scientific article', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $scientificArticle = Scientific_article::find($id);
            if (!$scientificArticle) {
                return response()->json(['message' => 'Scientific article not found'], 404);
            }

            $scientificArticle->delete();
            return response()->json(['message' => 'Scientific article deleted successfully'], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete scientific article', 'error' => $e->getMessage()], 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string',
                'publication_date' => 'nullable|date',
                'publishers' => 'required|string',
                'abstract' => 'required|string',
                'link' => 'nullable|string',
            ]);

            $scientificArticle = Scientific_article::create($validatedData);
            return response()->json(['message' => 'Scientific article created successfully', 'scientific_article' => $scientificArticle], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create scientific article', 'error' => $e->getMessage()], 500);
        }
    }
}
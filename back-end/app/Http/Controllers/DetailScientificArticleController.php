<?php

namespace App\Http\Controllers;

use App\Models\Detail_scientific_article;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class DetailScientificArticleController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_scientific' => 'required|integer|exists:scientific_article,id_scientific_article',
                'id_teacher' => 'required|integer|exists:teachers,id_teacher',
            ]);

            $detailScientificArticle = Detail_scientific_article::create($validatedData);

            return response()->json(['message' => 'Detail scientific article created successfully', 'research_project' => $detailScientificArticle], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create detail scientific article', 'error' => $e->getMessage()], 500);

        }
    }

    public function showByIdScientificArticle($id)
    {
        $detailScientificArticle = Detail_scientific_article::where('id_scientific', $id)
            ->get();

        if (!$detailScientificArticle) {
            return response()->json(['message' => 'Detail scientific article not found'], 404);
        }

        return response()->json(['Detail_scientific_article' => $detailScientificArticle], 200);
    }

    public function showByIdTeacher($id)
    {
        $detailScientificArticle = Detail_scientific_article::where('id_teacher', $id)
            ->get();

        if (!$detailScientificArticle) {
            return response()->json(['message' => 'Detail scientific article not found'], 404);
        }

        return response()->json(['Detail_scientific_article' => $detailScientificArticle], 200);
    }

    public function getAll()
    {
        $detailScientificArticle = Detail_scientific_article::all();

        return response()->json(['Detail_scientific_article' => $detailScientificArticle], 200);
    }

    public function updateByScientificArticle(Request $request, $id)
    {
        try {
            $detailScientificArticle = Detail_scientific_article::where('id_scientific', $id)->first();

            if (!$detailScientificArticle) {
                return response()->json(['message' => 'Detail research_project not found'], 404);
            }

            $validatedData = $request->validate([
                'id_scientific' => 'required|integer|exists:scientific_article,id_scientific',
                'id_teacher' => 'required|integer|exists:teachers,id_teacher',
            ]);

            $detailScientificArticle->update($validatedData);

            return response()->json(['message' => 'Detail research_project updated successfully', 'data' => $detailScientificArticle], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Failed', 'errors' => $th->getMessage()], 500);
        }
    }

}

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Scientific_article;
use App\Models\Detail_scientific_article;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ScientificArticleController extends Controller
{
    public function getAll()
    {
        $scientificArticles = Scientific_article::all();
        return response()->json(['scientific_articles' => $scientificArticles], 200);
    }

    public function getScientificArticlesById($id)
    {
        $scientificArticle = Detail_scientific_article::with('Teacher')->find($id);

        if (!$scientificArticle) {
            return response()->json(['message' => 'Detail scientific article not found'], 404);
        }
        
        $teachers = $scientificArticle->Teacher->pluck('id_teacher')->toArray();
        
        return response()->json([
            'scientific_article' => $scientificArticle,
            'teachers' => $teachers,
        ], 200);
    }

    public function getone($id)
    {
        $scientificArticle = Scientific_article::find($id);

        if (!$scientificArticle) {
            return response()->json(['message' => 'scientific article not found'], 404);
        }
    
        return response()->json([
            'scientific_article' => $scientificArticle,
        ], 200);
    }

    public function getById($id)
    {
        error_log("ok");
        $scientificArticle = Scientific_article::join('detail_scientific_article', 'scientific_article.id_scientific_article', '=', 'detail_scientific_article.id_scientific')
            ->join('teachers', 'detail_scientific_article.id_teacher', '=', 'teachers.id_teacher')
            ->select(
                'scientific_article.id_scientific_article',
                'scientific_article.title',
                DB::raw("DATE_FORMAT(scientific_article.publication_date, '%d/%m/%Y') AS publication_date"),
                'scientific_article.publication_date as publication_date_old',
                'scientific_article.publishers',
                'scientific_article.abstract',
                'scientific_article.link',
                DB::raw('GROUP_CONCAT(teachers.id_teacher) as id_teacher'),
                DB::raw('GROUP_CONCAT(teachers.name_teacher) as name_teacher')
            )
            ->groupBy(
                'scientific_article.id_scientific_article',
                'scientific_article.title',
                'scientific_article.publication_date',
                'scientific_article.publishers',
                'scientific_article.abstract',
                'scientific_article.link'
            )
            ->where('scientific_article.id_scientific_article', $id)
            ->get();

        if (!$scientificArticle) {
            return response()->json(['message' => 'Scientific article not found'], 404);
        }
        return response()->json($scientificArticle, 200);
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

    public function DeleteMany(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_scientific_article' => 'nullable|array',
            ]);

            $id_scientific_article_list = $validatedData['id_scientific_article'];
            error_log($request);
            foreach ($id_scientific_article_list as $id_scientific_article) {
                    $scientific_article = Scientific_article::findOrFail($id_scientific_article);
                    if ($scientific_article) {
                        $scientific_article->delete();
                    }
            }
            return response()->json([
                'message' => 'Xóa thành công',
                'id_scientific_article' => $id_scientific_article
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
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
            $id_scientific = $scientificArticle->id_scientific_article;            
            return response()->json(['id_scientific' => $id_scientific], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create scientific article', 'error' => $e->getMessage()], 500);
        }
    }
}
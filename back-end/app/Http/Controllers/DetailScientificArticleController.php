<?php

namespace App\Http\Controllers;

use App\Models\Detail_scientific_article;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;


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
        error_log("hung");
        $detailScientificArticle = Detail_scientific_article::where('id_scientific', $id)
            ->get();

        if (!$detailScientificArticle) {
            return response()->json(['message' => 'Detail scientific article not found'], 404);
        }

        $teachers = $detailScientificArticle->pluck('id_teacher')->toArray();

        return response()->json([
            'Detail_scientific_article' => $detailScientificArticle,
            'id_teacher_array' => $teachers
        ], 200);
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
        $validatedData = $request->validate([
            'id_teacher' => 'nullable|array',
        ]);

        try {

            if ($validatedData['id_teacher'] == []) {

                try {
                    // Tìm tất cả các bản ghi trong bảng detail_scientific_article có id_scientific tương ứng
                    $deletedRows = Detail_scientific_article::where('id_scientific', $id)->delete();

                    if ($deletedRows > 0) {
                        return response()->json(['message' => 'Deleted successfully'], 200);
                    } else {
                        return response()->json(['message' => 'No records found to delete'], 404);
                    }
                } catch (\Exception $e) {
                    return response()->json(['message' => 'Failed to delete', 'error' => $e->getMessage()], 500);
                }
            }

            DB::beginTransaction();
            // Lấy danh sách id_teacher cũ của id_scientific từ cơ sở dữ liệu
            $existingTeachers = Detail_scientific_article::where('id_scientific', $id)
                ->pluck('id_teacher')
                ->toArray();

            // so sánh array
            $teachersToRemove = array_diff($existingTeachers, $validatedData['id_teacher']);
            $teachersToAdd = array_diff($validatedData['id_teacher'], $existingTeachers);

            // Xóa
            Detail_scientific_article::where('id_scientific', $id)
                ->whereIn('id_teacher', $teachersToRemove)
                ->delete();

            // lưu
            foreach ($teachersToAdd as $teacherId) {
                Detail_scientific_article::create([
                    'id_scientific' => $id,
                    'id_teacher' => $teacherId,
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Detail scientific article updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to update detail scientific article', 'error' => $e->getMessage()], 500);
        }
    }


    public function deleteByScientificId(Request $request, $id)
    {
        try {
            // Tìm tất cả các bản ghi trong bảng detail_scientific_article có id_scientific tương ứng
            $deletedRows = Detail_scientific_article::where('id_scientific', $id)->delete();

            if ($deletedRows > 0) {
                return response()->json(['message' => 'Deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'No records found to delete'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete', 'error' => $e->getMessage()], 500);
        }
    }
}

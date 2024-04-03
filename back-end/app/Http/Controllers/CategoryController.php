<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Database\QueryException;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getAll()
    {
        try {
            $categories = Category::all();
            return response()->json($categories, 200);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error'], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function getCategoryById($id)
    {
        try {
            $categories = Category::findOrFail($id);
            return response()->json($categories, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Không tìm thấy danh mục'], 404);
        }
    }

    public function create(Request $request)
    {
        try {
            $request->validate([
                'name_vi' => 'required|string',
                'name_en' => 'required|string',
            ]);

            $category = Category::create([
                'name_vi' => $request->input('name_vi'),
                'name_en' => $request->input('name_en'),
            ]);

            return response()->json($category, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi tạo danh mục'], 500);
        }
    }

    public function get($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Thế loại không tồn tại'], 404);
        }

        return response()->json($category, 200);
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name_vi' => 'required|string',
                'name_en' => 'required|string',
            ]);

            $name_vi = $validatedData['name_vi'];
            $name_en = $validatedData['name_en'];

            $Category = Category::find($id);

            $Category->name_vi = $name_vi;
            $Category->name_en = $name_en;
            $Category->save();

            return response()->json([
                'message' => 'Cập nhật category thành công',
                'id_category' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật category', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateManyDeleted(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_category' => 'required|array',
                'deleted' => 'required|boolean',
            ]);

            $id_category_list = $validatedData['id_category'];
            $deleted = $validatedData['deleted'];

            foreach ($id_category_list as $id_category) {
                $news = News::where('id_category', $id_category)->exists();

                if (!$news) {
                    $category = Category::find($id_category);
                    if ($category) {
                        $category->delete();
                    }
                }
            }

            return response()->json([
                'message' => 'Xóa thành công',
                'id_category_list' => $id_category_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
        }
    }
}








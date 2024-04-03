<?php

namespace App\Http\Controllers;

use App\Models\Admission_news;
use App\Models\Department;
use App\Models\News;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function createDepartment(Request $request)
    {
        $validatedData = $request->validate([
            'name_department_vi' => 'required|string|max:100',
            'name_department_en' => 'required|string|max:100',
        ]);

        $department = Department::create([
            'name_department_vi' => $validatedData['name_department_vi'],
            'name_department_en' => $validatedData['name_department_en'],
        ]);

        return response()->json(['message' => 'Department created successfully', 'department' => $department], 201);
    }
    public function getAll()
    {
        try {
            $department = Department::all();
            return response()->json($department, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error', $e->getMessage()], 500);
        }
    }
    public function getDepartmentById($id)
    {
        try {
            $department = Department::findOrFail($id);
            return response()->json($department, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Không tìm thấy bộ môn này'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name_department_vi' => 'required|string',
                'name_department_en' => 'required|string',
            ]);

            $name_vi = $validatedData['name_department_vi'];
            $name_en = $validatedData['name_department_en'];

            $department = Department::find($id);

            $department->name_department_vi = $name_vi;
            $department->name_department_en = $name_en;
            $department->save();

            return response()->json([
                'message' => 'Cập nhật department thành công',
                'id_department' => $id
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật department', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateManyDeleted(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_department' => 'required|array',
            ]);

            $id_department_list = $validatedData['id_department'];
            $deleted_department_ids = [];

            foreach ($id_department_list as $id_department) {
                $news = Admission_news::where('id_department', $id_department)->get();

                if ($news->isEmpty()) {
                    $department = Department::find($id_department);
                    if ($department) {
                        $department->delete();
                        $deleted_department_ids[] = $id_department;
                    }
                }
            }

            if (empty($deleted_department_ids)) {
                return response()->json(['message' => 'Không có department ban nào được xóa'], 404);
            }

            return response()->json([
                'message' => 'Xóa thành công',
                'id_department_list' => $deleted_department_ids,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
        }
    }


}

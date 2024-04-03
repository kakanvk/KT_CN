<?php

namespace App\Http\Controllers;
use App\Models\Major;
use Illuminate\Http\Request;

class MajorsController extends Controller
{
    public function getAll()
    {
        $majors = Major::all();
        return response()->json($majors, 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name_vi' => 'required|string|max:100',
            'name_en' => 'required|string|max:100'
        ]);

        $major = Major::create([
            'name_vi' => $request->name_vi,
            'name_en' => $request->name_en
        ]);

        return response()->json(['message' => 'Major created successfully', 'major' => $major], 201);
    }

    public function getMajorsById($id)
    {
        $major = Major::findOrFail($id);
        return response()->json(['major' => $major], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name_vi' => 'required|string|max:100',
            'name_en' => 'required|string|max:100'
        ]);

        $major = Major::findOrFail($id);
        $major->update([
            'name_vi' => $request->name_vi,
            'name_en' => $request->name_en
        ]);

        return response()->json(['message' => 'Major updated successfully', 'major' => $major], 200);
    }

    public function checkDeleteMany(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'id_major' => 'required|array',
            ]);

            $id_major_list = $validatedData['id_major'];
            error_log($request);
            foreach ($id_major_list as $id_major) {

                    $Major = Major::find($id_major);
                    if ($Major) {
                        $Major->delete();
                    }
                
            }

            return response()->json([
                'message' => 'Xóa thành công',
                'id_major_list' => $id_major_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    
}

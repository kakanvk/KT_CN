<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ProgramController extends Controller
{
    // Lấy tất cả các bản ghi
    public function getAll()
    {
        try {
            $programs = Program::where('status', 1)->get();
            return response()->json(['programs' => $programs], 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => "Error", $th->getMessage()], 500);

        }
    }

    public function getAllhidden()
    {
        $programs = Program::where('status', 0)->get();
        return response()->json(['programs' => $programs], 200);
    }


    // Lấy thông tin của một bản ghi theo ID
    public function getDetails($id)
    {
        $program = Program::findOrFail($id);
        return response()->json(['program' => $program], 200);
    }

    // Thêm một bản ghi mới
    public function saveProgram(Request $request)
    {
        if (!$request->has('user_info')) {
            $user_info = $request->user_info;
        }

        // Validate incoming request data
        $validatedData = $request->validate([
            'id_major' => 'required|integer',
            'content' => 'nullable|string',
            'name_program' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            $major = Major::find($validatedData['id_major']);
            error_log($major);
            if (!$major) {
                return response()->json(['message' => 'Invalid id_major provided'], 400);
            }

            // Tạo chương trình mới
            $program = Program::create([
                'id_user' => optional($user_info)->id_user,
                'id_major' => $validatedData['id_major'],
                'content' => $validatedData['content'],
                'name_program' => $validatedData['name_program'],
            ]);

            DB::commit();

            // Trả về phản hồi thành công với dữ liệu chương trình mới
            return response()->json(['message' => 'Program created successfully', 'program' => $program], 201);
        } catch (\Exception $e) {
            // Nếu có lỗi, rollback giao dịch và trả về thông báo lỗi
            DB::rollback();
            return response()->json(['message' => 'Save failed', 'error' => $e->getMessage()], 500);
        }
    }


    // Xóa một bản ghi
    public function delete($id)
    {
        $program = Program::findOrFail($id);
        $program->delete();

        return response()->json(['message' => 'Program deleted successfully'], 200);
    }

    // Sửa thông tin một bản ghi
    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);
        $program->id_user = $request->input('id_user');
        $program->id_major = $request->input('id_major');
        $program->content = $request->input('content');
        $program->name_program = $request->input('name_program');
        $program->status = $request->input('status', true);
        $program->save();

        return response()->json(['message' => 'Program updated successfully', 'program' => $program], 200);
    }

    public function updateStatus(Request $request)
    {
        $id_programs = $request->input('id_program', []);

        foreach ($id_programs as $id_program) {
            $program = Program::findOrFail($id_program);
            $program->status = $request->input('status', true);
            $program->save();
        }

        return response()->json(['message' => 'Program status updated successfully'], 200);
    }
}

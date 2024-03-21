<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\Program;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ProgramController extends Controller
{
    // Lấy tất cả các bản ghi
    public function getAll()
    {
        $programs = Program::join('majors', 'program.id_major', '=', 'majors.id_major')
                            ->select('program.*', 'majors.name_vi as major_name_vi', 'majors.name_en as major_name_en')
                            ->get();
        
        return response()->json($programs, 200);
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

        try {
            $validatedData = $request->validate([
                'id_program' => 'required|array',
                'status' => 'required|boolean',
            ]);
            $id_programs = $validatedData['id_program'];
            $status = $validatedData['status'];

            foreach ($id_programs as $id_program) {
                $program = Program::findOrFail($id_program);
                $program->status = $status; 
                $program->timestamps = false;
                $program->save();
            }
            return response()->json([
                'message' => 'Cập nhật trạng thái thành công',
                'id_programs' => $id_programs
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }
    public function updateOneStatus($id)
    {
        try {

            $program = Program::find($id);

            if ($program) {
                $program->status = !$program->status;
                $program->timestamps = false;
                $program->save();

                return response()->json([
                    'message' => 'Cập nhật trạng thái thành công ',
                    'id_program' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái'], 500);
        }
    }
    public function updateManyDeleted(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_program' => 'required|array',
            ]);

            $id_program_list = $validatedData['id_program'];

            foreach ($id_program_list as $id_program) {
                $news = Program::find($id_program);

                if ($news) {
                    $news->delete();
                }
            }

            return response()->json([
                'message' => 'Cập nhật trạng thái xóa thành công',
                'id_program_list' => $id_program_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }
}

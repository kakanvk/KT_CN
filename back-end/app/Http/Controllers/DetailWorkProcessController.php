<?php

namespace App\Http\Controllers;

use App\Models\Detail_work_process;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;


class DetailWorkProcessController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_work_process' => 'required|integer|exists:work_process,id_work_process',
                'id_teacher' => 'required|array',
            ]);

            // Use map to create a Detail_work_process instance for each id_teacher value
            $detailWorkProcess = collect($validatedData['id_teacher'])->map(function ($id_teacher) use ($validatedData) {
                return Detail_work_process::create([
                    'id_work_process' => $validatedData['id_work_process'],
                    'id_teacher' => $id_teacher,
                ]);
            });

            return response()->json(['message' => 'Detail work process created successfully', 'research_projects' => $detailWorkProcess], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create detail work process', 'error' => $e->getMessage()], 500);
        }
    }
    public function showByIdWorkProcess($id)
    {
        error_log("hung");
        $detailWorkProcess = Detail_work_process::where('id_work_process', $id)->get();

        if (!$detailWorkProcess) {
            return response()->json(['message' => 'Detail work process not found'], 404);
        }

        $teachers = $detailWorkProcess->pluck('id_teacher')->toArray();

        return response()->json([
            'Detail_work_process' => $detailWorkProcess,
            'id_teacher_array' => $teachers
        ], 200);
    }

    public function showByIdTeacher($id)
    {
        $detailWorkProcess = Detail_work_process::where('id_teacher', $id)
            ->get();

        if (!$detailWorkProcess) {
            return response()->json(['message' => 'Detail work process not found'], 404);
        }

        return response()->json(['Detail_work_process' => $detailWorkProcess], 200);
    }

    public function getAll()
    {
        $detailWorkProcess = Detail_work_process::all();

        return response()->json(['Detail_work_process' => $detailWorkProcess], 200);
    }

    public function updateByWorkProcess(Request $request, $id)
    {
        $validatedData = $request->validate([
            'id_teacher' => 'nullable|array',
        ]);

        try {

            if ($validatedData['id_teacher'] == []) {

                try {
                    // Tìm tất cả các bản ghi trong bảng detail_work_process có id_work_process tương ứng
                    $deletedRows = Detail_work_process::where('id_work_process', $id)->delete();

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
            // Lấy danh sách id_teacher cũ của id_work_process từ cơ sở dữ liệu
            $existingTeachers = Detail_work_process::where('id_work_process', $id)
                ->pluck('id_teacher')
                ->toArray();

            // so sánh array
            $teachersToRemove = array_diff($existingTeachers, $validatedData['id_teacher']);
            $teachersToAdd = array_diff($validatedData['id_teacher'], $existingTeachers);

            // Xóa
            Detail_work_process::where('id_work_process', $id)
                ->whereIn('id_teacher', $teachersToRemove)
                ->delete();

            // lưu
            foreach ($teachersToAdd as $teacherId) {
                Detail_work_process::create([
                    'id_work_process' => $id,
                    'id_teacher' => $teacherId,
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Detail work process updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to update detail work process', 'error' => $e->getMessage()], 500);
        }
    }


    public function deleteByWorkProcessId(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'id_list' => 'nullable|array',
            ]);

            $id_work_process_list = $validatedData['id_list'];
            error_log("hungdep");
            if (count($id_work_process_list)===0) {
                return response()->json([
                    'message' => 'Không có dữ liệu để xóa',
                    'id_work_process_list' => $id_work_process_list
                ], 200);
            }

            foreach ($id_work_process_list as $id_work_process) {
                $detail_work_process = Detail_work_process::
                    where('id_work_process', $id_work_process)->get();
                    foreach ($detail_work_process as $ID) {
                        Detail_work_process::where('id_work_process', $ID)->delete();
                }
            }

            return response()->json([
                'message' => 'Xóa thành công',
                'id_work_process_list' => $id_work_process_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xóa trạng thái',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}

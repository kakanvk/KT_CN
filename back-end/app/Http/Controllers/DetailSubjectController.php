<?php

namespace App\Http\Controllers;

use App\Models\Detail_subject;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class DetailSubjectController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_subject' => 'required|integer|exists:subjects,id_subject',
                'id_teacher' => 'required|array',
            ]);

            $detailSubjects = collect($validatedData['id_teacher'])->map(function ($id_teacher) use ($validatedData) {
                $detailSubjectData = [
                    'id_subject' => $validatedData['id_subject'],
                    'id_teacher' => $id_teacher,
                ];
    
                // Tạo bản ghi Detail_subject từ dữ liệu đã được chỉnh sửa
                return Detail_subject::create($detailSubjectData);
            });
    
            return response()->json(['message' => 'Detail subjects created successfully', 'detail_subjects' => $detailSubjects], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create detail subject', 'error' => $e->getMessage()], 500);

        }
    }

    public function showByIdSubject($id)
    {
        $detailSubject = Detail_subject::where('id_subject', $id)
            ->get();
        if (!$detailSubject) {
            return response()->json(['message' => 'Detail subject not found'], 404);
        }
        $teachers = $detailSubject->pluck('id_teacher')->toArray();
        return response()->json([
            'Detail_subject' => $detailSubject,
            'id_teacher_array' => $teachers
        ], 200);
    }

    public function showByIdTeacher($id)
    {
        $detailSubject = Detail_subject::where('id_teacher', $id)
            ->get();

        if (!$detailSubject) {
            return response()->json(['message' => 'Detail subject not found'], 404);
        }

        return response()->json($detailSubject, 200);
    }

    public function getAll()
    {
        $detailSubject = Detail_subject::all();

        return response()->json(['detail_subject' => $detailSubject], 200);
    }

    public function updateBySubject(Request $request, $id)
    {
        $validatedData = $request->validate([
            'id_teacher' => 'nullable|array',
        ]);

        try {
            if (empty($validatedData['id_teacher'])) {
                $deletedRows = Detail_subject::where('id_subject', $id)->delete();
                if ($deletedRows > 0) {
                    return response()->json(['message' => 'Deleted successfully'], 200);
                } else {
                    return response()->json(['message' => 'No records found to delete'], 404);
                }
            }
    
            DB::beginTransaction();
                $existingTeachers = Detail_subject::where('id_subject', $id)
                ->pluck('id_teacher')
                ->toArray();
    
            $teachersToRemove = array_diff($existingTeachers, $validatedData['id_teacher']);
            $teachersToAdd = array_diff($validatedData['id_teacher'], $existingTeachers);
    
            Detail_subject::where('id_subject', $id)
                ->whereIn('id_teacher', $teachersToRemove)
                ->delete();
    
            foreach ($teachersToAdd as $teacherId) {
                Detail_subject::create([
                    'id_subject' => $id,
                    'id_teacher' => $teacherId,
                ]);
            }
    
            DB::commit();
    
            return response()->json(['message' => 'Detail subjects updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to update detail subjects', 'error' => $e->getMessage()], 500);
        }
    }
    public function deleteManyDetailSubject(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_list' => 'required|array',
            ]);
    
            $id_subject_list = $validatedData['id_list'];
    
            if (count($id_subject_list) === 0) {
                return response()->json([
                    'message' => 'Không có dữ liệu để xóa',
                    'id_subject_list' => $id_subject_list
                ], 200);
            }
    
            foreach ($id_subject_list as $id_subject) {
                $detail_subject = Detail_subject::where('id_subject', $id_subject)->get();
                
                foreach ($detail_subject as $ID) {
                    Detail_subject::where('id_subject', $ID)->delete();
                }
            }
    
            return response()->json([
                'message' => 'Xóa thành công',
                'id_subject_list' => $id_subject_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

}

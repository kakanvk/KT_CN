<?php

namespace App\Http\Controllers;

use App\Models\Detail_subject;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DetailSubjectController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_subject' => 'required|integer|exists:subjects,id_subject',
                'id_teacher' => 'required|integer|exists:teachers,id_teacher',
            ]);

            $detailSubject = Detail_subject::create($validatedData);

            return response()->json(['message' => 'Detail subject created successfully', 'detail_subject' => $detailSubject], 201);
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
        return response()->json($detailSubject, 200);
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
            'id_teacher_old' => 'required|integer',
            'id_teacher_update' => 'required|integer',
        ]);

        $detailSubject = Detail_subject::where('id_subject', $id)
            ->where('id_teacher', $validatedData['id_teacher_old'])
            ->first();

        if (!$detailSubject) {
            return response()->json(['message' => 'Detail subject not found for the given id_subject and id_teacher'], 404);
        }

        $detailSubject->update([
            'id_teacher' => $validatedData['id_teacher_update']
        ]);

        return response()->json(['message' => 'Detail subject updated successfully', 'data' => $detailSubject], 200);
    }
    public function deleteManyDetailSubject(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_subject' => 'required|array',
            ]);

            $id_subject_list = $validatedData['id_subject'];
            error_log($request);
            foreach ($id_subject_list as $id_subject) {
                    $detail_subject = Detail_subject::find($id_subject);
                    if ($detail_subject) {
                        $detail_subject->delete();
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

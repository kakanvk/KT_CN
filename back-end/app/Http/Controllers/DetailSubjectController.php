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

        return response()->json(['detail_subject' => $detailSubject], 200);
    }

    public function showByIdTeacher($id)
    {
        $detailSubject = Detail_subject::where('id_teacher', $id)
            ->get();

        if (!$detailSubject) {
            return response()->json(['message' => 'Detail subject not found'], 404);
        }

        return response()->json(['detail_subject' => $detailSubject], 200);
    }

    public function getAll()
    {
        $detailSubject = Detail_subject::all();

        return response()->json(['detail_subject' => $detailSubject], 200);
    }

    public function updateBySubject($request, $id)
    {
        $detailSubject = Detail_subject::where('id_subject', $id)
            ->get();

        if (!$detailSubject) {
            return response()->json(['message' => 'Detail subject not found'], 404);
        }

        $validatedData = $request->validate([
            'id_major' => 'required|integer',
            'id_teacher' => 'required|integer',
        ]);

        $detailSubject->update($validatedData);

        return response()->json(['message' => 'Detail subject updated successfully', 'data' => $detailSubject], 200);
    }
}

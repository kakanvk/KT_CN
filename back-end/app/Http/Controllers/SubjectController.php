<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function getSubjects()
    {
        $subjects = Subject::with('majors')->get();
        return response()->json(['subjects' => $subjects], 200);
    }

    public function getSubjectById($id)
    {
        $subject = Subject::with('majors')->find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }
        return response()->json(['subject' => $subject], 200);
    }

    public function createSubject(Request $request)
    {
        $validatedData = $request->validate([
            'id_major' => 'required|exists:majors,id_major',
            'name_vi' => 'required|string',
            'name_en' => 'required|string',
            'study_object' => 'required|string',
            'beginning_year' => 'required|integer',
            'institutions' => 'required|string',
        ]);

        try {
            $subject = Subject::create([
                'id_major' => $validatedData['id_major'],
                'name_vi' => $validatedData['name_vi'],
                'name_en' => $validatedData['name_en'],
                'study_object' => $validatedData['study_object'],
                'beginning_year' => $validatedData['beginning_year'],
                'institutions' => $validatedData['institutions'],
            ]);

            return response()->json(['message' => 'Subject created successfully', 'subject' => $subject], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create subject', 'error' => $e->getMessage()], 500);
        }
    }
    public function updateSubject(Request $request, $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $validatedData = $request->validate([
            'id_major' => 'sometimes|required|exists:majors,id_major',
            'name_vi' => 'sometimes|required|string',
            'name_en' => 'sometimes|required|string',
            'study_object' => 'sometimes|required|string',
            'beginning_year' => 'sometimes|required|integer',
            'institutions' => 'sometimes|required|string',
        ]);

        try {
            $subject->update($validatedData);
            return response()->json(['message' => 'Subject updated successfully', 'subject' => $subject], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update subject', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteSubject($id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        try {
            $subject->delete();
            return response()->json(['message' => 'Subject deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete subject', 'error' => $e->getMessage()], 500);
        }
    }
}
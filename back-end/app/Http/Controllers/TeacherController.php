<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teacher;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class TeacherController extends Controller
{
    public function getAll()
    {
        try {
            $teacher = Teacher::all();
            return response()->json($teacher, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get teacher', 'error' => $e->getMessage()], 500);
        }
    }

    public function getdetail($id)
    {
        $Teacher = Teacher::findOrFail($id);
        if (!$Teacher) {
            return response()->json(['message' => 'Subject not found'], 404);
        }
        return response()->json($Teacher, 200);
    }

    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name_teacher' => 'required|string|max:100',
                'email' => 'required|email:rfc,dns|unique:teachers,email',
                'phone' => 'nullable|string|max:11|unique:teachers,phone',
                'position' => 'nullable|string',
                'academic_title' => 'nullable|string',
                'language' => 'nullable|string|max:50',
                'research_group' => 'nullable|string',
                'degree' => 'nullable|string|max:100',
                'research_area' => 'nullable|string',
                'unit' => 'nullable|string',
                'graduation_year' => 'nullable|string',
                'address' => 'nullable|string',
                'gg_site' => 'nullable|string',
                'gg_scholar' => 'nullable|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        }
        try {
            $teacher = Teacher::create([
                'name_teacher' => $validatedData['name_teacher'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
                'position' => $validatedData['position'],
                'academic_title' => $validatedData['academic_title'],
                'language' => $validatedData['language'],
                'research_group' => $validatedData['research_group'],
                'degree' => $validatedData['degree'],
                'research_area' => $validatedData['research_area'],
                'unit' => $validatedData['unit'],
                'graduation_year' => $validatedData['graduation_year'],
                'address' => $validatedData['address'],
                'gg_site' => $validatedData['gg_site'],
                'gg_scholar' => $validatedData['gg_scholar'],
            ]);

            return response()->json(['message' => 'Teacher created successfully', 'teacher' => $teacher], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create teacher', 'error' => $e->getMessage()], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name_teacher' => 'required|string|max:100',
                'email' => [
                    'required',
                    'email:rfc,dns',
                    Rule::unique('teachers', 'email')->ignore($id, 'id_teacher')
                ],
                'phone' => [
                    'nullable',
                    'string',
                    'max:11',
                    Rule::unique('teachers', 'phone')->ignore($id, 'id_teacher')
                ],
                'position' => 'nullable|string',
                'academic_title' => 'nullable|string',
                'language' => 'nullable|string|max:50',
                'research_group' => 'nullable|string',
                'degree' => 'nullable|string|max:100',
                'research_area' => 'nullable|string',
                'unit' => 'nullable|string',
                'address' => 'nullable|string',
                'graduation_year' => 'nullable|string',
                'gg_site' => 'nullable|string',
                'gg_scholar' => 'nullable|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        }

        try {
            // Tìm bản ghi cần cập nhật
            $teacher = Teacher::findOrFail($id);

            // Cập nhật thông tin của tin tức

            $teacher->name_teacher = $request->input('name_teacher');
            $teacher->email = $request->input('email');
            $teacher->phone = $request->input('phone');
            $teacher->position = $request->input('position');
            $teacher->graduation_year = $request->input('graduation_year');
            $teacher->academic_title = $request->input('academic_title');
            $teacher->language = $request->input('language');
            $teacher->research_group = $request->input('research_group');
            $teacher->degree = $request->input('degree');
            $teacher->research_area = $request->input('research_area');
            $teacher->unit = $request->input('unit');
            $teacher->address = $request->input('address');
            $teacher->gg_site = $request->input('gg_site');
            $teacher->gg_scholar = $request->input('gg_scholar');
            $teacher->save();

            return response()->json(['message' => 'Teacher update successfully', 'teacher' => $teacher], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update teacher', 'error' => $e->getMessage()], 500);
        }
    }

}

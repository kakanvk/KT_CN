<?php

namespace App\Http\Controllers;

use App\Models\Detail_research_project;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;


class DetailResearchProjectController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_research_project' => 'required|integer|exists:research_projects,id_research_project',
                'id_teacher' => 'required|integer|exists:teachers,id_teacher',
            ]);

            $detailResearchProject = Detail_research_project::create($validatedData);

            return response()->json(['message' => 'Detail subject created successfully', 'research_project' => $detailResearchProject], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create detail research project', 'error' => $e->getMessage()], 500);

        }
    }

    public function showByIdResearchProject($id)
    {
        $detailResearchProject = Detail_research_project::where('id_research_project', $id)
            ->get();

        if (!$detailResearchProject) {
            return response()->json(['message' => 'Detail research project not found'], 404);
        }

        return response()->json(['Detail_research_project' => $detailResearchProject], 200);
    }

    public function showByIdTeacher($id)
    {
        $detailResearchProject = Detail_research_project::where('id_teacher', $id)
            ->get();

        if (!$detailResearchProject) {
            return response()->json(['message' => 'Detail subject not found'], 404);
        }

        return response()->json(['Detail_research_project' => $detailResearchProject], 200);
    }

    public function getAll()
    {
        $detailResearchProject = Detail_research_project::all();

        return response()->json(['Detail_research_project' => $detailResearchProject], 200);
    }

    public function updateByResearchProject(Request $request, $id)
    {
        $validatedData = $request->validate([
            'id_teacher' => 'required|array',
        ]);

        try {
            DB::beginTransaction();

            // Lấy danh sách id_teacher cũ của id_research_project từ cơ sở dữ liệu
            $existingTeachers = Detail_research_project::where('id_research_project', $id)
                ->pluck('id_teacher')
                ->toArray();

            // so sánh array
            $teachersToRemove = array_diff($existingTeachers, $validatedData['id_teacher']);
            $teachersToAdd = array_diff($validatedData['id_teacher'], $existingTeachers);

            // Xóa
            Detail_research_project::where('id_research_project', $id)
                ->whereIn('id_teacher', $teachersToRemove)
                ->delete();

            // lưu
            foreach ($teachersToAdd as $teacherId) {
                Detail_research_project::create([
                    'id_research_project' => $id,
                    'id_teacher' => $teacherId,
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Detail scientific article updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to update detail scientific article', 'error' => $e->getMessage()], 500);
        }
    }
}

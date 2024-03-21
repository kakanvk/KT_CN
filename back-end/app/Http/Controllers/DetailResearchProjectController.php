<?php

namespace App\Http\Controllers;

use App\Models\Detail_research_project;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


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
        try {
            $detailResearchProject = Detail_research_project::where('id_research_project', $id)->first();

            if (!$detailResearchProject) {
                return response()->json(['message' => 'Detail research_project not found'], 404);
            }

            $validatedData = $request->validate([
                'id_research_project' => 'required|integer|exists:research_projects,id_research_project',
                'id_teacher' => 'required|integer|exists:teachers,id_teacher',
            ]);

            $detailResearchProject->update($validatedData);

            return response()->json(['message' => 'Detail research_project updated successfully', 'data' => $detailResearchProject], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Failed', 'errors' => $th->getMessage()], 500);
        }
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Research_projects;
use App\Models\Work_process;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ResearchProjectController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string',
                'status_date' => 'nullable|date',
                'investigator' => 'required|integer',
                'status' => 'nullable|string',
                'link' => 'nullable|string',
            ]);

            $research_projects = Research_projects::create($validatedData);
            $id_research_project = $research_projects->id_research_project; 

            return response()->json([
                'message' => 'research project created successfully', 
                'research_projects' => $research_projects,
                'id_research_project' => $id_research_project
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create research project', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {

        try {
            $research_projects = Research_projects::find($id);

            if (!$research_projects) {
                return response()->json(['message' => 'research project not found'], 404);
            }

            $research_projects->delete();

            return response()->json(['message' => 'research project deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete research project', 'error' => $e->getMessage()], 500);
        }
    }

    public function DeleteMany(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_research_project' => 'nullable|array',
            ]);

            $id_research_project_list = $validatedData['id_research_project'];
            error_log($request);

            foreach ($id_research_project_list as $id_research_project) {
                    $research_project = Research_projects::findOrFail($id_research_project);
                    if ($research_project) {
                        $research_project->delete();
                    }
            }
            return response()->json([
                'message' => 'Xóa thành công',
                'id_research_project_list' => $id_research_project_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
        }
    }
    public function update(Request $request, $id)
    {

        try {
            $research_projects = Research_projects::find($id);

            if (!$research_projects) {
                return response()->json(['message' => 'research project not found'], 404);
            }

            $validatedData = $request->validate([
                'title' => 'required|string',
                'status_date' => 'nullable|date',
                'investigator' => 'required|integer',
                'status' => 'nullable|string',
                'link' => 'nullable|string',
            ]);
            error_log('fkfkas ' );
            $research_projects->update($validatedData);

            return response()->json(['message' => 'research project updated successfully', 'Research_projects' => $research_projects], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to updated research project', 'error' => $e->getMessage()], 500);
        }
    }

    public function getById($id)
    {
        $research_projects = Research_projects::find($id);

        if (!$research_projects) {
            return response()->json(['message' => 'research project not found'], 404);
        }

        return response()->json(['Research_projects' => $research_projects], 200);
    }

    public function getAll()
    {
        $research_projects = Research_projects::all();

        if (!$research_projects) {
            return response()->json(['message' => 'research project not found'], 404);
        }

        return response()->json(['Research_projects' => $research_projects], 200);
    }
}
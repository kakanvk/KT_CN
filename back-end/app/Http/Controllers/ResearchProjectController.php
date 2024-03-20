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

            return response()->json(['message' => 'research project created successfully', 'research_projects' => $research_projects], 201);
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
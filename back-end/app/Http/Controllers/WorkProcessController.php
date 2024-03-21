<?php

namespace App\Http\Controllers;

use App\Models\Work_process;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WorkProcessController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'time' => 'required|string|max:50',
                'academic_institution' => 'nullable|string',
                'address' => 'nullable|string',
                'position' => 'nullable|string',
            ]);

            $workProcess = Work_process::create($validatedData);

            return response()->json(['message' => 'Work process created successfully', 'workProcess' => $workProcess], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create work process', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {

        try {
            $workProcess = Work_process::find($id);

            if (!$workProcess) {
                return response()->json(['message' => 'Work process not found'], 404);
            }

            $workProcess->delete();

            return response()->json(['message' => 'Work process deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete work process', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {

        try {
            $workProcess = Work_process::find($id);

            if (!$workProcess) {
                return response()->json(['message' => 'Work process not found'], 404);
            }

            $validatedData = $request->validate([
                'time' => 'required|string',
                'academic_institution' => 'nullable|string',
                'address' => 'nullable|string',
                'position' => 'nullable|string',
            ]);

            $workProcess->update($validatedData);

            return response()->json(['message' => 'Work process updated successfully', 'work_process' => $workProcess], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->validator->errors()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to updated work process', 'error' => $e->getMessage()], 500);
        }
    }

    public function getById($id)
    {
        $workProcess = Work_process::find($id);

        if (!$workProcess) {
            return response()->json(['message' => 'Work process not found'], 404);
        }

        return response()->json(['work_process' => $workProcess], 200);
    }

    public function getAll()
    {
        $workProcess = Work_process::all();

        if (!$workProcess) {
            return response()->json(['message' => 'Work process not found'], 404);
        }

        return response()->json(['work_process' => $workProcess], 200);
    }
}
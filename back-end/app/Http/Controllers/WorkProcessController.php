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

    public function DeleteMany(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_work_process' => 'required|array',
            ]);

            $id_work_process_list = $validatedData['id_work_process'];
            error_log($request);
            foreach ($id_work_process_list as $id_work_process) {
                    $WorkProcess = Work_process::find($id_work_process);
                    if ($WorkProcess) {
                        $WorkProcess->delete();
                    }
            }
            return response()->json([
                'message' => 'Xóa thành công',
                'id_work_process' => $id_work_process
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
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
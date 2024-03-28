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
                'id_teacher' => 'required|array',
            ]);

            $detailResearchProject = collect($validatedData['id_teacher'])->map(function ($id_teacher) use ($validatedData) {
                return Detail_research_project::create([
                    'id_research_project' => $validatedData['id_research_project'],
                    'id_teacher' => $id_teacher,
                ]);
            });
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
        $teachers = $detailResearchProject->pluck('id_teacher')->toArray();
        return response()->json([
            'Detail_research_project' => $detailResearchProject,
            'id_teacher_array' => $teachers
        ], 200);
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
            'id_teacher' => 'nullable|array',
        ]);

        try {
            if ($validatedData['id_teacher'] == []) {

                try {
                    // Tìm tất cả các bản ghi trong bảng detail_scientific_article có id_research_project tương ứng
                    $deletedRows = Detail_research_project::where('id_research_project', $id)->delete();

                    if ($deletedRows > 0) {
                        return response()->json(['message' => 'Deleted successfully'], 200);
                    } else {
                        return response()->json(['message' => 'No records found to delete'], 404);
                    }
                } catch (\Exception $e) {
                    return response()->json(['message' => 'Failed to delete', 'error' => $e->getMessage()], 500);
                }
            }

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

            return response()->json(['message' => 'Detail research project updated successfully'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to update detail research project', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteManyDetailResearchProject(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_list' => 'nullable|array',
            ]);

            $id_research_project_list = $validatedData['id_list'];
            if (count($id_research_project_list) === 0) {
                return response()->json([
                    'message' => 'Không có dữ liệu để xóa',
                    'id_research_project_list' => $id_research_project_list
                ], 200);
            }

            foreach ($id_research_project_list as $id_research_project) {
                $detail_research_projects = Detail_research_project::
                    where('id_research_project', $id_research_project)->get();
                foreach ($detail_research_projects as $ID) {
                    Detail_research_project::where('id_research_project', $id_research_project)->delete();
                }
            }

            return response()->json([
                'message' => 'Xóa thành công',
                'id_research_project_list' => $id_research_project_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xóa trạng thái',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}

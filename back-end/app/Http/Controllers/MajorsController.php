<?php

namespace App\Http\Controllers;
use App\Models\Major;
use Illuminate\Http\Request;

class MajorsController extends Controller
{
    public function getAll()
    {
        $majors = Major::all();
        return response()->json($majors, 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name_vi' => 'required|string|max:100',
            'name_en' => 'required|string|max:100'
        ]);

        $major = Major::create([
            'name_vi' => $request->name_vi,
            'name_en' => $request->name_en
        ]);

        return response()->json(['message' => 'Major created successfully', 'major' => $major], 201);
    }

    public function getMajorsById($id)
    {
        $major = Major::findOrFail($id);
        return response()->json(['major' => $major], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name_vi' => 'required|string|max:100',
            'name_en' => 'required|string|max:100'
        ]);

        $major = Major::findOrFail($id);
        $major->update([
            'name_vi' => $request->name_vi,
            'name_en' => $request->name_en
        ]);

        return response()->json(['message' => 'Major updated successfully', 'major' => $major], 200);
    }

    public function checkDeleteMany(Request $request)
    {
        $ids = $request->input('ids', []);
        Major::whereIn('id', $ids)->delete();

        return response()->json(['message' => 'Selected majors soft-deleted successfully'], 200);
    }
}

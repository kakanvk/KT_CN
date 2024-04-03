<?php

// app/Http/Controllers/ImageUploadController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function upload(Request $request) {

        $folder = "uploads/" . date('Y/m/d');
        $fileName = date('H-i') . '-' . $request->file('upload')->getClientOriginalName();
        $url = $request->file('upload')->move($folder, $fileName);
        
        $path = env('APP_URL') . '/' . $folder . '/' . $fileName;

        if ($request->input('res_filename')) {
            return response(["fileUrl" => $folder . '/' . $fileName]);
        }

        return response([
                    "fileName" => $fileName,
                    "uploaded" => 1,
                    "url" => $path
                ]);
    }
    public function upload1(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);

        // Save the uploaded file
        $avatar = $request->file('avatar');
        $imageName = time() . '.' . $avatar->getClientOriginalExtension();
        $avatar->move(public_path('uploads/thumbnail/'), $imageName);

        // Return the image URL
        $imageUrl = url('uploads/thumbnail/' . $imageName);

        return response()->json(['imageUrl' => $imageUrl], 200);
    }
}



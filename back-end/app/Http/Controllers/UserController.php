<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Hiển thị danh sách các users.
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $users = User::where('is_deleted', 0)->get();

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while fetching users'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.

     * Thêm một user mới.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $email = $request->input('email');

            // Kiểm tra xem người dùng đã tồn tại dựa trên email
            $existingUser = User::where('email', $email)->first();

            if ($existingUser) {
                // Nếu người dùng đã tồn tại, chỉ cập nhật trạng thái is_deleted thành 0
                $existingUser->is_deleted = 0;
                $existingUser->save();

                return response()->json(['message' => 'User email exists. Updated is_deleted to 0.'], 200);
            } else {
                // Nếu người dùng chưa tồn tại, tạo mới và đặt is_deleted thành 0
                $user = User::create([
                    'email' => $email
                ]);

                return response()->json(['message' => 'User created successfully.', 'user' => $user], 201);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Please input email.'], 500);
        }
    }

    public function updateRole(Request $request)
    {
        try {
            $role = $request->input('role');
            $id = $request->input('id_user');

            $user = User::find($id);

            if ($user) {
                // Set the role based on the value of the $role variable
                if ($role === 'SuperAdmin') {
                    $user->role = 1;
                } elseif ($role === 'Admin') {
                    $user->role = 0;
                } else {
                    // Invalid role provided
                    return response()->json(['message' => 'Invalid role provided'], 400);
                }

                $user->save();
                return response()->json([
                    'message' => 'Role updated successfully',
                    'id_user' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Invalid user ID'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while updating the role'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);

            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found or could not be deleted'], 404);
        }
    }

    public function findByIdUser($id_user)
    {
        try {
            $user = User::findOrFail($id_user);

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function softDelete($id)
    {
        try {
            $user = User::findOrFail($id);

            $user->is_deleted = 1;
            $user->save();

            return response()->json(['message' => 'User soft deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found or could not be soft deleted'], 404);
        }
    }

    // public function update(Request $request, $id)
    // {
    //     // Validate dữ liệu đầu vào
    //     $request->validate([
    //         'name' => 'required|string',
    //         'email' => 'required|email|unique:users,email,' . $id,
    //     ]);

    //     // Tìm người dùng cần cập nhật
    //     $user = User::findOrFail($id);

    //     // Cập nhật thông tin người dùng
    //     $user->name = $request->name;
    //     $user->email = $request->email;
    //     $user->save();

    //     // Trả về thông tin của người dùng đã cập nhật
    //     return response()->json($user, 200);
    // }

}

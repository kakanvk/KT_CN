<?php

namespace App\Http\Controllers;

use App\Models\Admission_news;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AdmissionNewsController extends Controller
{
    public function createAdmission(Request $request)
    {
        try {
            if (!$request->has('user_info')) {
                $user_info = $request->user_info;
            }
            // Validate the request data
            $validatedData = $request->validate([
                'id_department' => 'required|integer',
                'title_vi' => 'required|string',
                'title_en' => 'required|string',
                'content_vi' => 'nullable|string',
                'content_en' => 'nullable|string',
                'thumbnail' => 'nullable|string',
                'type_university_vi' => 'required|string|in:Sau đại học,Đại học',
                'type_university_en' => 'required|string|in:Higher education,Undergraduate',
            ]);

            // Create a new admission news record
            $admissionNews = Admission_news::create([
                'id_user' => $user_info->id_user,
                'update_by' => $user_info->id_user,
                'id_department' => $validatedData['id_department'],
                'title_vi' => $validatedData['title_vi'],
                'title_en' => $validatedData['title_en'],
                'content_vi' => $validatedData['content_vi'],
                'content_en' => $validatedData['content_en'],
                'thumbnail' => $validatedData['thumbnail'],
                'type_university_vi' => $validatedData['type_university_vi'],
                'type_university_en' => $validatedData['type_university_en'],
            ]);

            return response()->json(['message' => 'Admission news created successfully', 'admission_news' => $admissionNews], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create admission news', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAll()
    {
        try {
            $admission_news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                    'departments.name_department_en',
                    'departments.name_department_vi',
                )
                ->where('admission_news.is_deleted', '=', 0)
                ->orderBy('admission_news.created_at')
                ->get();



            return response()->json($admission_news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get all admission news', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAdmissionNewsById($id)
    {
        try {
            $admission_news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                    'departments.name_department_en',
                    'departments.name_department_vi',
                )
                ->where('admission_news.is_deleted', '=', 0)
                ->where('admission_news.id_admission_news', '=', $id)
                ->orderBy('admission_news.created_at')
                ->get();



            return response()->json($admission_news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to get all admission news', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateNews(Request $request, $id)
    {
        if (!$request->has('user_info')) {
            $user_info = $request->user_info;
        }

        try {
            DB::beginTransaction();

            $validatedData = $request->validate([
                'id_department' => 'required|integer',
                'title_vi' => 'required|string',
                'title_en' => 'required|string',
                'content_vi' => 'nullable|string',
                'content_en' => 'nullable|string',
                'thumbnail' => 'nullable|string',
                'type_university_vi' => 'required|string|in:Sau đại học,Đại học',
                'type_university_en' => 'required|string|in:Higher education,Undergraduate',
            ]);

            // Tìm bản ghi cần cập nhật
            $Admission_news = Admission_news::findOrFail($id);

            // Cập nhật thông tin của tin tức
            $Admission_news->update([
                'update_by' => $user_info->id_user,
                'id_department' => $request->input('id_department'),
                'content_vi' => $request->input('content_vi'),
                'content_en' => $request->input('content_en'),
                'title_vi' => $request->input('title_vi'),
                'title_en' => $request->input('title_en'),
                'thumbnail' => $request->input('thumbnail'),
                'type_university_vi' => $validatedData['type_university_vi'],
                'type_university_en' => $validatedData['type_university_en'],
                'status_en' => $validatedData['content_en'] ? 1 : 0,
                'status_vi' => $validatedData['content_vi'] ? 1 : 0,
            ]);

            DB::commit();
            return response()->json(['message' => 'Cập nhật tin tức thành công'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Cập nhật tin tức thất bại', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateDeleted($id)
    {
        try {
            $admission_new = Admission_news::find($id);

            if ($admission_new) {
                $admission_new->is_deleted = !$admission_new->is_deleted;
                $admission_new->save();

                return response()->json([
                    'message' => 'Cập nhật trạng thái xóa thành công ',
                    'id_new' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa news'], 500);
        }
    }

    public function updateManyDeleted(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_new' => 'required|array',
                'deleted' => 'required|boolean',
            ]);

            $id_new_list = $validatedData['id_new'];
            $deleted = $validatedData['deleted'];

            foreach ($id_new_list as $id_new) {
                $Admission_news = Admission_news::find($id_new);

                if ($Admission_news) {
                    $Admission_news->is_deleted = $deleted;
                    $Admission_news->save();
                }
            }

            return response()->json([
                'message' => 'Cập nhật trạng thái xóa thành công',
                'id_admission_new_list' => $id_new_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAllNewsAdmin()
    {
        try {
            $admission_news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                    'departments.name_department_en',
                    'departments.name_department_vi',
                )
                ->where('admission_news.is_deleted', '=', 0)
                ->orderBy('admission_news.created_at')
                ->get();

            $responseData = [];
            foreach ($admission_news as $item) {
                $responseData[] = [
                    'id_admission_news' => $item->id_admission_news,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'type_university_vi' => $item->type_university_vi,
                        'name_department_vi' => $item->name_department_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'type_university_en' => $item->type_university_en,
                        'name_department_en' => $item->name_department_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_department' => $item->id_department,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->user_name,
                        'email' => $item->user_email,
                        'photoURL' => $item->photoURL,
                    ],
                    'user_update' => [
                        'id_user' => $item->update_by,
                        'name' => $item->update_user_name,
                        'email' => $item->update_user_email,
                        'photoURL' => $item->update_user_photoURL,
                    ],
                ];
            }

            return response()->json($responseData, 200);
        } catch (\Exception $e) {
            return response()->json(['Xảy ra lỗi', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAllNewsAdminHidden()
    {
        try {
            $admission_news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                    'departments.name_department_en',
                    'departments.name_department_vi',
                )
                ->where('admission_news.is_deleted', '=', 1)
                ->orderBy('admission_news.updated_at')
                ->get();

            if (count($admission_news) === 0) {
                return response()->json([], 200);
            }

            foreach ($admission_news as $item) {
                $responseData[] = [
                    'id_admission_news' => $item->id_admission_news,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'type_university_vi' => $item->type_university_vi,
                        'name_department_vi' => $item->name_department_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'type_university_en' => $item->type_university_en,
                        'name_department_en' => $item->name_department_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_department' => $item->id_department,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->user_name,
                        'email' => $item->user_email,
                        'photoURL' => $item->photoURL,
                    ],
                    'user_update' => [
                        'id_user' => $item->update_by,
                        'name' => $item->update_user_name,
                        'email' => $item->update_user_email,
                        'photoURL' => $item->update_user_photoURL,
                    ],
                ];
            }

            return response()->json($responseData, 200);
        } catch (\Exception $e) {
            return response()->json(['error', 'error' => $e->getMessage()], 500);
        }
    }

    public function getNewByIDAdminHidden($id)
    {
        try {
            $admission_news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                    'departments.name_department_en',
                    'departments.name_department_vi',
                )
                ->orderBy('admission_news.updated_at')
                ->where('admission_news.is_deleted', '=', 1)
                ->where('admission_news.id_admission_news', '=', $id)
                ->get();


            if (count($admission_news) === 0) {
                return response()->json([], 200);
            }

            foreach ($admission_news as $item) {
                $responseData[] = [
                    'id_admission_news' => $item->id_admission_news,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'type_university_vi' => $item->type_university_vi,
                        'name_department_vi' => $item->name_department_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'type_university_en' => $item->type_university_en,
                        'name_department_en' => $item->name_department_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_department' => $item->id_department,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->user_name,
                        'email' => $item->user_email,
                        'photoURL' => $item->photoURL,
                    ],
                    'user_update' => [
                        'id_user' => $item->update_by,
                        'name' => $item->update_user_name,
                        'email' => $item->update_user_email,
                        'photoURL' => $item->update_user_photoURL,
                    ],
                ];
            }
            return response()->json($responseData, 200);
        } catch (\Exception $e) {
            return response()->json(['error', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateStatusVi($id)
    {
        try {

            $admission_news = Admission_news::find($id);

            if ($admission_news) {
                $admission_news->status_vi = !$admission_news->status_vi;
                $admission_news->timestamps = false;
                $admission_news->save();

                return response()->json([
                    'message' => 'Cập nhật trạng thái thành công ',
                    'id_new' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateStatusEn($id)
    {
        try {
            $admission_news = Admission_news::find($id);

            if ($admission_news) {
                $admission_news->status_en = !$admission_news->status_en;
                $admission_news->timestamps = false;
                $admission_news->save();

                return response()->json([
                    'message' => 'Cập nhật trạng thái thành công ',
                    'id_new' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function UpdateStatuses(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id_new' => 'required|array',
                'status' => 'required|boolean',
                'lang' => 'required|string'
            ]);

            $id_new_list = $validatedData['id_new'];
            $status = $validatedData['status'];
            $lang = $validatedData['lang'];

            foreach ($id_new_list as $id_new) {
                $admission_news = Admission_news::find($id_new);

                if ($admission_news) {
                    if ($lang == 'vi') {
                        $admission_news->status_vi = $status;
                    } else {
                        $admission_news->status_en = $status;
                    }
                    $admission_news->timestamps = false;
                    $admission_news->save();
                }
            }

            return response()->json([
                'message' => 'Cập nhật trạng thái thành công',
                'id_admission_new_list' => $id_new_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteNews(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'id_new' => 'required|array',
            ]);

            $id_new_list = $validatedData['id_new'];

            foreach ($id_new_list as $id_new) {
                $news = Admission_news::find($id_new);

                if ($news) {
                    $news->delete();
                }
            }

            return response()->json([
                'message' => 'xóa thành công',
                'id_new_list' => $id_new_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function searchByTitleCategoryIsDeleted(Request $request)
    {
        $searchTerm = $request->input('search');

        try {
            $news = Admission_news::join('departments', 'admission_news.id_department', '=', 'departments.id_department')
                ->join('users', 'admission_news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'admission_news.update_by', '=', 'update_user.id_user')
                ->select(
                    'admission_news.id_admission_news',
                    'admission_news.title_vi',
                    'admission_news.title_en',
                    'admission_news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'admission_news.content_en',
                    'admission_news.content_vi',
                    'admission_news.view_count',
                    'admission_news.updated_at',
                    'admission_news.created_at',
                    'admission_news.thumbnail',
                    'admission_news.id_department',
                    'admission_news.status_vi',
                    'admission_news.status_en',
                    'admission_news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                    'admission_news.type_university_vi',
                    'admission_news.type_university_en',
                    'departments.name_department_en',
                    'departments.name_department_vi',

                )
                ->orderBy('admission_news.updated_at')
                ->where(function ($query) use ($searchTerm) {
                    $query->where('admission_news.title_en', 'like', '%' . $searchTerm . '%')
                        ->orWhere('admission_news.title_vi', 'like', '%' . $searchTerm . '%');
                })
                ->orWhere(function ($query) use ($searchTerm) {
                    $query->where('departments.name_department_en', 'like', '%' . $searchTerm . '%')
                        ->orWhere('departments.name_department_vi', 'like', '%' . $searchTerm . '%');
                })
                ->where('admission_news.is_deleted', '=', 1)
                ->get();

            foreach ($news as $item) {
                $responseData[] = [
                    'id_admission_news' => $item->id_admission_news,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'type_university_vi' => $item->type_university_vi,
                        'name_department_vi' => $item->name_department_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'type_university_en' => $item->type_university_en,
                        'name_department_en' => $item->name_department_en,

                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_department' => $item->id_department,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->user_name,
                        'email' => $item->user_email,
                        'photoURL' => $item->photoURL,
                    ],
                    'user_update' => [
                        'id_user' => $item->update_by,
                        'name' => $item->update_user_name,
                        'email' => $item->update_user_email,
                        'photoURL' => $item->update_user_photoURL,
                    ],
                ];
            }

            if (!$news) {
                return response()->json(['message' => 'Bài viết không tồn tại'], 404);
            }

            return response()->json($responseData, 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'error', $th], 404);
        }
    }

    public function getTop5RelatedDepartment($id_admission_news)
    {
        $news = Admission_news::join('departments', 'departments.id_department', '=', 'admission_news.id_department')
            ->select(
                'admission_news.id_admission_news',
                'admission_news.title_vi',
                'admission_news.title_en',
                'admission_news.view_count',
                'admission_news.updated_at',
                'admission_news.created_at',
                'admission_news.thumbnail',
                'admission_news.id_department',
                'admission_news.status_vi',
                'admission_news.status_en',
                'admission_news.is_deleted'
            )
            ->where('admission_news.id_department', '=', function ($query) use ($id_admission_news) {
                $query->select('id_department')
                    ->from('admission_news')
                    ->where('id_admission_news', '=', $id_admission_news);
            })
            ->where('is_deleted', 0)
            ->where('admission_news.id_admission_news', '!=', $id_admission_news)
            ->take(5)
            ->get();
        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }
        return response()->json($news, 200);
    }

    public function getAllByDepartment($id)
    {
        try {
            $news = Admission_news::where('id_department', $id)
                ->where('admission_news.is_deleted', '=', 0)
                ->orderBy('admission_news.created_at')
                ->get();
            if ($news->isEmpty()) {
                return response()->json(['message' => 'Không có tin tức nào trong danh mục này.'], 404);
            }
            return response()->json($news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu tin tức.'], 500);
        }
    }

    public function updateViewCount($id)
    {
        try {
            $news = Admission_news::find($id);
            error_log("id".$news);
            if ($news) {
                $news->view_count = $news->view_count + 1;
                $news->timestamps = false;
                $news->save();
                return response()->json([
                    'message' => 'Cập nhật view thành công ',
                    'id_new' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật view'], 500);
        }
    }

}

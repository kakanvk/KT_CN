<?php

namespace App\Http\Controllers;

use App\Models\NewEn;
use App\Models\NewVi;
use Illuminate\Http\JsonResponse;
use App\Models\News;
use App\Models\Admission_news;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    public function getAllNews()
    {
        $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'news.id_new',
                'news.title_vi',
                'news.title_en',
                'news.content_en',
                'news.content_vi',
                'news.view_count',
                'news.updated_at',
                'news.created_at',
                'news.thumbnail',
                'news.id_category',
                'categories.name_en as category_name_en',
                'categories.name_vi as category_name_vi',
                'news.status_vi',
                'news.status_en'
            )
            ->orderBy('news.created_at')
            ->where('news.is_deleted', '=', 0)
            ->get();

        return response()->json($news, 200);
    }

    public function getAllNewsAdmin()
    {
        try {
            $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
                ->join('users', 'news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'news.update_by', '=', 'update_user.id_user')
                ->select(
                    'news.id_new',
                    'news.title_vi',
                    'news.title_en',
                    'news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'news.content_en',
                    'news.content_vi',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'categories.name_en as category_name_en',
                    'categories.name_vi as category_name_vi',
                    'news.status_vi',
                    'news.status_en',
                    'news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL'
                )
                ->where('news.is_deleted', '=', 0)
                ->orderBy('news.created_at')
                ->get();

            $responseData = [];
            foreach ($news as $item) {
                $responseData[] = [
                    'id_new' => $item->id_new,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'category_name_vi' => $item->category_name_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'category_name_en' => $item->category_name_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_category' => $item->id_category,
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
        } catch (\Throwable $th) {
            return response()->json("Error", 500);
        }
    }

    public function getAllNewsAdminHidden()
    {
        try {
            $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
                ->join('users', 'news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'news.update_by', '=', 'update_user.id_user')
                ->select(
                    'news.id_new',
                    'news.title_vi',
                    'news.title_en',
                    'news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'news.content_en',
                    'news.content_vi',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'categories.name_en as category_name_en',
                    'categories.name_vi as category_name_vi',
                    'news.status_vi',
                    'news.status_en',
                    'news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL'
                )
                ->where('news.is_deleted', '=', 1)
                ->orderBy('news.updated_at')
                ->get();

            if (count($news) === 0) {
                return response()->json([], 200);
            }

            foreach ($news as $item) {
                $responseData[] = [
                    'id_new' => $item->id_new,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'category_name_vi' => $item->category_name_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'category_name_en' => $item->category_name_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_category' => $item->id_category,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->user_name, // Sửa tên trường dữ liệu
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
        } catch (\Throwable $th) {
            return response()->json("error", 500);
        }
    }


    public function getAllByCategory($category_id)
    {
        try {
            $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
                ->select(
                    'news.id_new',
                    'news.title_vi',
                    'news.title_en',
                    'news.content_en',
                    'news.content_vi',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'categories.name_en as category_name_en',
                    'categories.name_vi as category_name_vi',
                    'news.status_vi',
                    'news.status_en',
                )
                ->orderBy('news.created_at')
                ->where('news.id_category', '=', $category_id)
                ->where('news.is_deleted', '=', 0)
                ->get();

            if ($news->isEmpty()) {
                return response()->json(['message' => 'Không có tin tức nào trong danh mục này.'], 404);
            }
            return response()->json($news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu tin tức.'], 500);
        }
    }

    public function TakeFullNewsByCategory3_4_5_6_7_9_10_And_NewsAdmission()
    {
        try {
            $categoryIds = [3, 4, 5, 6, 7, 9, 10];
            $newsCollection = collect();

            foreach ($categoryIds as $categoryId) {
                $news = News::where('id_category', $categoryId)
                    ->where('is_deleted', '=', 0)
                    ->orderBy('created_at')
                    ->take(6)
                    ->get();

                $newsCollection = $newsCollection->concat($news);
            }
    
            $NewsAdmission = Admission_news::where('is_deleted', 0)
            ->orderBy('created_at')
            ->get();

            $newsCollection = $newsCollection->concat($NewsAdmission);

            if ($newsCollection->isEmpty()) {
                return response()->json(['message' => 'Không có tin tức nào trong các danh mục này.'], 404);
            }

            return response()->json($newsCollection, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu tin tức: ' . $e->getMessage()], 500);
        }
    }

    public function getAllByUser($id)
    {
        try {
            $news = News::where('id_user', $id)
                ->where('news.is_deleted', '=', 0)
                ->orderBy('news.created_at')
                ->get();
            if ($news->isEmpty()) {
                return response()->json(['message' => 'user chưa có bài đăng nào.'], 404);
            }
            return response()->json($news, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi lấy dữ liệu tin tức.'], 500);
        }
    }

    public function getNewByID($id)
    {
        $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'news.id_new',
                'news.title_vi',
                'news.title_en',
                'news.content_en',
                'news.content_vi',
                'news.view_count',
                'news.updated_at',
                'news.created_at',
                'news.thumbnail',
                'news.id_category',
                'categories.name_en as category_name_en',
                'categories.name_vi as category_name_vi',
                'news.status_vi',
                'news.status_en',
            )
            ->orderBy('news.created_at')
            ->where('news.id_new', '=', $id)
            ->where('news.is_deleted', '=', 0)
            ->get();


        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

    public function getNewByIDAdmin($id)
    {
        try {
            $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
                ->join('users', 'news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'news.update_by', '=', 'update_user.id_user')
                ->select(
                    'news.id_new',
                    'news.title_vi',
                    'news.title_en',
                    'news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'news.content_en',
                    'news.content_vi',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'categories.name_en as category_name_en',
                    'categories.name_vi as category_name_vi',
                    'news.status_vi',
                    'news.status_en',
                    'news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL'
                )
                ->orderBy('news.created_at')
                ->where('news.is_deleted', '=', 0)
                ->where('news.id_new', '=', $id)
                ->get();


            foreach ($news as $item) {
                $responseData[] = [
                    'id_new' => $item->id_new,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'category_name_vi' => $item->category_name_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'category_name_en' => $item->category_name_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_category' => $item->id_category,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->name,
                        'email' => $item->email,
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
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }
    }

    public function getNewByIDAdminHidden($id)
    {
        try {
            $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
                ->join('users', 'news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'news.update_by', '=', 'update_user.id_user')
                ->select(
                    'news.id_new',
                    'news.title_vi',
                    'news.title_en',
                    'news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'news.content_en',
                    'news.content_vi',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'categories.name_en as category_name_en',
                    'categories.name_vi as category_name_vi',
                    'news.status_vi',
                    'news.status_en',
                    'news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL'
                )
                ->orderBy('news.updated_at')
                ->where('news.is_deleted', '=', 1)
                ->where('news.id_new', '=', $id)
                ->get();


            foreach ($news as $item) {
                $responseData[] = [
                    'id_new' => $item->id_new,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'category_name_vi' => $item->category_name_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'category_name_en' => $item->category_name_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_category' => $item->id_category,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->name,
                        'email' => $item->email,
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
            return response()->json(['message' => 'Lỗi'], 404);
        }
    }

    public function get5LatestNews()
    {
        $news = News::select(
            'news.id_new',
            'news.title_vi',
            'news.title_en',
            'news.view_count',
            'news.updated_at',
            'news.created_at',
            'news.thumbnail',
            'news.id_category',
            'news.status_vi',
            'news.status_en'
        )->orderBy('created_at', 'desc')
            ->where('is_deleted', 0)
            ->take(5)->get();

        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

    public function getTop5ViewCount()
    {
        $news = News::select(
            'news.id_new',
            'news.title_vi',
            'news.title_en',
            'news.view_count',
            'news.updated_at',
            'news.created_at',
            'news.thumbnail',
            'news.id_category',
            'news.status_vi',
            'news.status_en'
        )->orderBy('view_count', 'desc')
            ->where('is_deleted', 0)
            ->take(5)->get();

        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

    public function getTop5RelatedCategory(Request $request, $id_new)
    {
        try {
            $validatedData = $request->validate([
                'id_category' => 'required|integer',
            ]);
            $id_category = $validatedData['id_category'];
            error_log($id_category);
            $news = News::join('categories', 'categories.id_category', '=', 'news.id_category')
                ->select(
                    'news.id_new',
                    'news.title_vi',
                    'news.title_en',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'news.status_vi',
                    'news.status_en'
                )
                ->where('news.id_category', '=', $id_category)
                ->where('news.id_new', '!=', $id_new)
                ->where('is_deleted', 0)
                ->take(5)
                ->get();
            if (!$news) {
                return response()->json(['message' => 'Bài viết không tồn tại'], 404);
            }
            return response()->json($news, 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'lỗi', $th->getMessage()], 500);
        }
    }

    public function saveNews(Request $request)
    {
        if (!$request->has('user_info')) {
            $user_info = $request->user_info;
        }
        // Validate incoming request data
        $validatedData = $request->validate([
            'id_category' => 'required|exists:categories,id_category',
            'title_en' => 'nullable|string',
            'title_vi' => 'nullable|string',
            'content_en' => 'nullable|string',
            'content_vi' => 'nullable|string',
            'thumbnail' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            $news = News::create([
                'id_user' => $user_info->id_user,
                'update_by' => $user_info->id_user,
                'id_category' => $request->input('id_category'),
                'content_vi' => $request->input('content_vi'),
                'content_en' => $request->input('content_en'),
                'title_vi' => $request->input('title_vi'),
                'title_en' => $request->input('title_en'),
                'thumbnail' => $request->input('thumbnail'),
            ]);

            if ($validatedData['content_en'] === null) {
                $news->status_en = 0;
                $news->save();
            }

            if ($validatedData['content_vi'] === null) {
                $news->status_vi = 0;
                $news->save();
            }
            DB::commit();
            return response()->json(['message' => $news], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Lưu thất bại', $e], 500);
        }
    }

    public function updateNews(Request $request, $id)
    {
        if (!$request->has('user_info')) {
            $user_info = $request->user_info;
        }
        // Validate incoming request data
        $validatedData = $request->validate([
            'id_category' => 'required|exists:categories,id_category',
            'title_en' => 'nullable|string',
            'title_vi' => 'nullable|string',
            'content_en' => 'nullable|string',
            'content_vi' => 'nullable|string',
            'view_count' => 'nullable|integer',
            'thumbnail' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            // Tìm bản ghi cần cập nhật
            $news = News::findOrFail($id);

            // Cập nhật thông tin của tin tức

            $news->update_by = $user_info->id_user;
            $news->id_category = $request->input('id_category');
            $news->content_vi = $request->input('content_vi');
            $news->content_en = $request->input('content_en');
            $news->title_vi = $request->input('title_vi');
            $news->title_en = $request->input('title_en');
            $news->thumbnail = $request->input('thumbnail');


            // Xử lý trường hợp nếu nội dung tiếng Anh hoặc tiếng Việt bị rỗng
            if ($validatedData['content_en'] === null) {
                $news->status_en = 0;
            } else {
                $news->status_en = 1;
            }

            if ($validatedData['content_vi'] === null) {
                $news->status_vi = 0;
            } else {
                $news->status_vi = 1;
            }

            $news->save();

            DB::commit();
            return response()->json(['message' => 'Cập nhật tin tức thành công'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Cập nhật tin tức thất bại', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateStatusVi($id)
    {
        try {

            $news = News::find($id);

            if ($news) {
                $news->status_vi = !$news->status_vi;
                $news->timestamps = false;
                $news->save();

                return response()->json([
                    'message' => 'Cập nhật trạng thái thành công ',
                    'id_new' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái'], 500);
        }
    }

    public function updateStatusEn($id)
    {
        try {
            $news = News::find($id);

            if ($news) {
                $news->status_en = !$news->status_en;
                $news->timestamps = false;
                $news->save();

                return response()->json([
                    'message' => 'Cập nhật trạng thái thành công ',
                    'id_new' => $id
                ], 200);
            } else {
                return response()->json(['message' => 'Id không chính xác'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái'], 500);
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
                $news = News::find($id_new);

                if ($news) {
                    if ($lang == 'vi') {
                        $news->status_vi = $status;
                    } else {
                        $news->status_en = $status;
                    }
                    $news->timestamps = false;
                    $news->save();
                }
            }

            return response()->json([
                'message' => 'Cập nhật trạng thái thành công',
                'id_new_list' => $id_new_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateDeleted($id)
    {
        try {
            $news = News::find($id);

            if ($news) {
                $news->is_deleted = !$news->is_deleted;
                $news->save();

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
                $news = News::find($id_new);

                if ($news) {
                    $news->is_deleted = $deleted;
                    $news->save();
                }
            }

            return response()->json([
                'message' => 'Cập nhật trạng thái xóa thành công',
                'id_new_list' => $id_new_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi cập nhật trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteNews(Request $request)
    {
        try {

            error_log("Req" . $request);

            $validatedData = $request->validate([
                'id_new' => 'required|array',
            ]);

            $id_new_list = $validatedData['id_new'];

            foreach ($id_new_list as $id_new) {
                $news = News::find($id_new);

                if ($news) {
                    $news->delete();
                }
            }

            return response()->json([
                'message' => 'Trạng thái xóa thành công',
                'id_new_list' => $id_new_list
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Đã xảy ra lỗi khi xóa trạng thái', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateViewCount($id)
    {
        try {
            $news = News::find($id);

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

    public function searchByTitleCategory(Request $request)
    {
        $searchTerm = $request->input('search');
        try {
            $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
                ->join('users', 'news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'news.update_by', '=', 'update_user.id_user')
                ->select(
                    'news.id_new',
                    'news.is_deleted',
                    'news.title_vi',
                    'news.title_en',
                    'news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'news.content_en',
                    'news.content_vi',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'categories.name_en as category_name_en',
                    'categories.name_vi as category_name_vi',
                    'news.status_vi',
                    'news.status_en',
                    'news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                )
                ->orderBy('news.created_at')
                ->where(function ($query) use ($searchTerm) {
                    $query->where('news.title_en', 'like', '%' . $searchTerm . '%')
                        ->orWhere('news.title_vi', 'like', '%' . $searchTerm . '%');
                })
                ->orWhere(function ($query) use ($searchTerm) {
                    $query->where('categories.name_en', 'like', '%' . $searchTerm . '%')
                        ->orWhere('categories.name_vi', 'like', '%' . $searchTerm . '%');
                })
                ->where('news.is_deleted', '=', 0)
                ->get();


            foreach ($news as $item) {
                $responseData[] = [
                    'is_deleted' => $item->is_deleted,
                    'id_new' => $item->id_new,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'category_name_vi' => $item->category_name_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'category_name_en' => $item->category_name_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_category' => $item->id_category,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->name,
                        'email' => $item->email,
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

    public function searchByTitleCategoryIsDeleted(Request $request)
    {
        $searchTerm = $request->input('search');

        try {
            $news = News::join('categories', 'news.id_category', '=', 'categories.id_category')
                ->join('users', 'news.id_user', '=', 'users.id_user')
                ->leftJoin('users as update_user', 'news.update_by', '=', 'update_user.id_user')
                ->select(
                    'news.id_new',
                    'news.is_deleted',
                    'news.title_vi',
                    'news.title_en',
                    'news.id_user',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.photoURL',
                    'news.content_en',
                    'news.content_vi',
                    'news.view_count',
                    'news.updated_at',
                    'news.created_at',
                    'news.thumbnail',
                    'news.id_category',
                    'categories.name_en as category_name_en',
                    'categories.name_vi as category_name_vi',
                    'news.status_vi',
                    'news.status_en',
                    'news.update_by',
                    'update_user.name as update_user_name',
                    'update_user.email as update_user_email',
                    'update_user.photoURL as update_user_photoURL',
                )
                ->orderBy('news.updated_at')
                ->where(function ($query) use ($searchTerm) {
                    $query->where('news.title_en', 'like', '%' . $searchTerm . '%')
                        ->orWhere('news.title_vi', 'like', '%' . $searchTerm . '%');
                })
                ->orWhere(function ($query) use ($searchTerm) {
                    $query->where('categories.name_en', 'like', '%' . $searchTerm . '%')
                        ->orWhere('categories.name_vi', 'like', '%' . $searchTerm . '%');
                })
                ->where('news.is_deleted', '=', 1)
                ->get();

            foreach ($news as $item) {
                $responseData[] = [
                    'is_deleted' => $item->is_deleted,
                    'id_new' => $item->id_new,
                    'vi' => [
                        'title_vi' => $item->title_vi,
                        'content_vi' => $item->content_vi,
                        'status_vi' => $item->status_vi,
                        'category_name_vi' => $item->category_name_vi,
                    ],
                    'en' => [
                        'title_en' => $item->title_en,
                        'content_en' => $item->content_en,
                        'status_en' => $item->status_en,
                        'category_name_en' => $item->category_name_en,
                    ],
                    'view_count' => $item->view_count,
                    'updated_at' => $item->updated_at,
                    'created_at' => $item->created_at,
                    'thumbnail' => $item->thumbnail,
                    'id_category' => $item->id_category,
                    'user' => [
                        'id_user' => $item->id_user,
                        'name' => $item->name,
                        'email' => $item->email,
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
}

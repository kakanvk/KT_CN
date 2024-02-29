<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use App\Models\NewEn;
use App\Models\NewVi;

class NewViEnController extends Controller
{


    public function getDetailNews(Request $request, $id)
    {
        // giá trị mặc địh
        $lang = $request->input('lang', 'vi');

        $newsTable = ($lang === 'en') ? 'new_en' : 'new_vi';
        $news = News::join($newsTable, 'news.id_' . $lang, '=', $newsTable . '.id_' . $lang)
            ->join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'news.id_new',
                'news.view_count',
                'new_' . $lang . '.title',
                'news.updated_at',
                'news.created_at',
                'new_' . $lang . '.content',
                'news.thumbnail',
                'news.id_category',
                'categories.name_' . $lang . ' as category_name',
            )
            ->where('news.id_new', '=', $id)
            ->get();


        if (!$news) {
            return response()->json(['message' => 'Bài viết không tồn tại'], 404);
        }

        return response()->json($news, 200);
    }

    public function getAll(Request $request)
    {
        $lang = $request->input('lang', 'vi');

        $table = ($lang === 'en') ? NewEn::class : NewVi::class;

        $news = $table::all();

        return response()->json($news, 200);
    }

    public function 
    getAllNewViEN(Request $request)
    {
        $lang = $request->input('lang', 'vi');

        $newsTable = ($lang === 'en') ? 'new_en' : 'new_vi';
        // Lấy thông tin từ cơ sở dữ liệu
        $news = News::join($newsTable, 'news.id_' . $lang, '=', $newsTable . '.id_' . $lang)
            ->join('categories', 'news.id_category', '=', 'categories.id_category')
            ->select(
                'new_' . $lang . '.title',
                'news.id_new',
                'news.created_at',
                'news.updated_at',
                'news.view_count',
                'new_' . $lang . '.content',
                'news.thumbnail',
                'categories.name_' . $lang . ' as category',
                'categories.id_category'
            )
            ->get();

        return response()->json($news, 200);
    }
}

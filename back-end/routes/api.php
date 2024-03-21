<?php

use App\Http\Controllers\AdmissionNewsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DetailResearchProjectController;
use App\Http\Controllers\DetailScientificArticleController;
use App\Http\Controllers\DetailSubjectController;
use App\Http\Controllers\ResearchProjectController;
use App\Http\Controllers\ScientificArticleController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\WorkProcessController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\MajorsController;

/*;
use App
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//---------------------------------Admin-------------------------------------//

//admin not role

Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/news', [NewsController::class, 'getAllNewsAdmin']);//ok
    Route::post('/admin/news', [NewsController::class, 'saveNews']);//ok
    Route::get('/admin/news/{id}', [NewsController::class, 'getNewByIDAdmin']);//ok
    Route::put('/admin/news/{id}', [NewsController::class, 'updateNews']);//ok
    Route::get('/admin/news-hidden', [NewsController::class, 'getAllNewsAdminHidden']);//ok
    Route::get('/admin/news-hidden/{id}', [NewsController::class, 'getNewByIDAdminHidden']);//ok
    Route::put('/admin/news/update/status-en/{id}', [NewsController::class, 'updateStatusEn']);
    Route::put('/admin/news/update/status-vi/{id}', [NewsController::class, 'updateStatusVi']);
    Route::put('/admin/news/update/UpdateStatuses', [NewsController::class, 'UpdateStatuses']);
    Route::put('/admin/news/softDelete/{id}', [NewsController::class, 'updateDeleted']);
    Route::put('/admin/news/soft-list/delete', [NewsController::class, 'updateManyDeleted']);
    Route::delete('/admin/news/force-delete', [NewsController::class, 'deleteNews']);
    Route::get('admin/news/search/TitleCategoryIsDeleted', [NewsController::class, 'searchByTitleCategoryIsDeleted']);//ok
    Route::get('/admin/getCurrentUser', [AuthController::class, 'getCurrentUser']);

    Route::get('/news/search/TitleCategoryIsDeleted', [NewsController::class, 'searchByTitleCategoryIsDeleted']);//ok
});

//department
Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/department', [DepartmentController::class, 'getAll']);
    Route::post('/admin/department', [DepartmentController::class, 'createDepartment']);
    Route::get('/admin/department/{id}', [DepartmentController::class, 'getDepartmentById']);
    Route::get('/admin/department', [DepartmentController::class, 'getAll']);
    Route::put('/admin/department/{id}', [DepartmentController::class, 'update']);
    Route::put('/admin/department/soft-list/delete', [DepartmentController::class, 'updateManyDeleted']);

});
//Admission news
Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/admission-news', [AdmissionNewsController::class, 'getAllNewsAdmin']);
    Route::get('/admin/admission-news-hidden', [AdmissionNewsController::class, 'getAllNewsAdminHidden']);
    Route::get('/admin/admission-news-hidden/{id}', [AdmissionNewsController::class, 'getNewByIDAdminHidden']);
    Route::post('/admin/admission-news', [AdmissionNewsController::class, 'createAdmission']);
    Route::put('/admin/admission-news/{id}', [AdmissionNewsController::class, 'updateNews']);
    Route::put('/admin/admission-news/softDelete/{id}', [AdmissionNewsController::class, 'updateDeleted']);
    Route::put('/admin/admission-news/soft-list/delete', [AdmissionNewsController::class, 'updateManyDeleted']);
    Route::put('/admin/admission-news/update/status-en/{id}', [AdmissionNewsController::class, 'updateStatusEn']);
    Route::put('/admin/admission-news/update/status-vi/{id}', [AdmissionNewsController::class, 'updateStatusVi']);
    Route::put('/admin/admission-news/update/UpdateStatuses', [AdmissionNewsController::class, 'UpdateStatuses']);
    Route::delete('/admin/admission-news/force-delete', [AdmissionNewsController::class, 'deleteNews']);
    Route::get('admin/admission-news/search/TitleCategoryIsDeleted', [AdmissionNewsController::class, 'searchByTitleCategoryIsDeleted']);//ok

});

//category
Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/categories', [CategoryController::class, 'getAll']);
    Route::get('/admin/category/{id}', [CategoryController::class, 'getCategoryById']);
    Route::post('/admin/category', [CategoryController::class, 'create']);
    Route::put('/admin/category/{id}', [CategoryController::class, 'update']);
    Route::put('/admin/category/soft-list/delete', [CategoryController::class, 'updateManyDeleted']);
});

//Admission news
Route::middleware('check.jwt')->group(function () {
    Route::get('/admin/admission-news', [AdmissionNewsController::class, 'getAllNewsAdmin']);
    Route::get('/admin/admission-news-hidden', [AdmissionNewsController::class, 'getAllNewsAdminHidden']);
    Route::get('/admin/admission-news-hidden/{id}', [AdmissionNewsController::class, 'getNewByIDAdminHidden']);
    Route::post('/admin/admission-news', [AdmissionNewsController::class, 'createAdmission']);
    Route::put('/admin/admission-news/{id}', [AdmissionNewsController::class, 'updateNews']);
    Route::put('/admin/admission-news/softDelete/{id}', [AdmissionNewsController::class, 'updateDeleted']);
    Route::put('/admin/admission-news/soft-list/delete', [AdmissionNewsController::class, 'updateManyDeleted']);
    Route::put('/admin/admission-news/update/status-en/{id}', [AdmissionNewsController::class, 'updateStatusEn']);
    Route::put('/admin/admission-news/update/status-vi/{id}', [AdmissionNewsController::class, 'updateStatusVi']);
    Route::put('/admin/admission-news/update/UpdateStatuses', [AdmissionNewsController::class, 'UpdateStatuses']);
    Route::delete('/admin/admission-news/force-delete', [AdmissionNewsController::class, 'deleteNews']);
    Route::get('admin/admission-news/search/TitleCategoryIsDeleted', [AdmissionNewsController::class, 'searchByTitleCategoryIsDeleted']);//ok

});

Route::post('/admin/upload-image', [ImageUploadController::class, 'upload'])->name('upload.image');

//users
Route::middleware(['check.jwt', 'check.role'])->group(function () {
    Route::post('/admin/upload-image-', [ImageUploadController::class, 'upload1'])->name('upload.image');
    Route::get('admin/users', [UserController::class, 'index']);
    Route::get('admin/users/{id_user}', [UserController::class, 'findByIdUser']);
    Route::post('admin/users', [UserController::class, 'store']);
    Route::delete('admin/users/{id_user}', [UserController::class, 'destroy']);
    // Route::put('admin/users/{id_user}', [UserController::class, 'update']);
    Route::put('admin/users/soft-delete/{id}', [UserController::class, 'softDelete']);
    Route::put('admin/users/role/change', [UserController::class, 'updateRole']);
});

//Admin: check role
Route::middleware(['check.jwt', 'check.role'])->group(function () {
    Route::get('/news/user/{id_user}', [NewsController::class, 'getAllByUser']);
});



//----------------------------------User---------------------------------//
//'top 5
Route::get('news/get5LatestNews', [NewsController::class, 'get5LatestNews']);//ok
Route::get('admission-news/getTop5RelatedDepartment/{id}', [AdmissionNewsController::class, 'getTop5RelatedDepartment']);//ok
Route::get('news/getTop5ViewCount', [NewsController::class, 'getTop5ViewCount']);//ok
Route::get('news/getTop5RelatedCategory/{id}', [NewsController::class, 'getTop5RelatedCategory']);//ok



//student-set


//news
Route::get('/news', [NewsController::class, 'getAllNews']);
Route::get('/news/{id}', [NewsController::class, 'getNewByID']);//ok
Route::get('/news/category/{id_category}', [NewsController::class, 'getAllByCategory']);//ok
Route::get('/news/category/Take6/TakeFullNewsByCategory', [NewsController::class, 'TakeFullNewsByCategory3_4_5_6_7_9_10_And_NewsAdmission']);//ok


Route::get('/news/search/TitleCategory', [NewsController::class, 'searchByTitleCategory']);//ok
Route::put('/news/updateViewCount/{id}', [NewsController::class, 'updateViewCount']);//ok

//department
Route::get('/department', [DepartmentController::class, 'getAll']);

//Admission news
Route::get('/admission-news', [AdmissionNewsController::class, 'getAll']);
Route::get('/admission-news/{id}', [AdmissionNewsController::class, 'getAdmissionNewsById']);
Route::get('/admission-news/department/{id}', [AdmissionNewsController::class, 'getAllByDepartment']);//ok
Route::put('/admission-news/updateViewCount/{id}', [AdmissionNewsController::class, 'updateViewCount']);//ok


//Category
Route::get('/categories', [CategoryController::class, 'getAll']);
Route::get('/category/{id_category}', [CategoryController::class, 'get']);

// Route::post('/admin/authentication', [AuthController::class, 'UserAuthentication']);

//program

Route::middleware(['check.jwt'])->group(function () {
    Route::get('/admin/programs', [ProgramController::class, 'getAll']);

    Route::get('/admin/programs/all/hidden', [ProgramController::class, 'getAllhidden']);

    Route::get('/admin/programs/{id}', [ProgramController::class, 'getDetails']);

    Route::post('/admin/programs', [ProgramController::class, 'saveProgram']);

    Route::delete('/admin/programs/{id}', [ProgramController::class, 'delete']);
    Route::delete('/admin/programs/delete/list', [ProgramController::class, 'updateManyDeleted']);

    Route::put('/admin/programs/{id}', [ProgramController::class, 'update']);

    Route::put('/admin/programs/{id}/update/one/status', [ProgramController::class, 'updateOneStatus']);

    Route::put('/admin/programs/all/status', [ProgramController::class, 'updateStatus']);
});


//majors
Route::get('/admin/majors', [MajorsController::class, 'getAll']);

Route::get('/admin/majors/{id}', [MajorsController::class, 'getMajorsById']);

Route::post('/admin/majors', [MajorsController::class, 'create']);

Route::put('/admin/majors/{id}', [MajorsController::class, 'update']);

Route::delete('/admin/majors/soft-list/delete', [MajorsController::class, 'checkDeleteMany']); //not ok

//subject
Route::get('/subjects', [SubjectController::class, 'getSubjects']);

Route::get('/subjects/{id}', [SubjectController::class, 'getSubjectById']);

Route::post('admin/subjects', [SubjectController::class, 'createSubject']);

Route::put('admin/subjects/{id}', [SubjectController::class, 'updateSubject']);

Route::delete('admin/subjects/soft-list/delete', [SubjectController::class, 'deleteManySubject']);

// detail_subject
Route::get('/detail-subject', [DetailSubjectController::class, 'getAll']);
Route::get('/detail-subject/subject/{id}', [DetailSubjectController::class, 'showByIdSubject']);
Route::get('/detail-subject/teacher/{id}', [DetailSubjectController::class, 'showByIdTeacher']);
Route::post('/detail-subject', [DetailSubjectController::class, 'create']);
Route::put('/detail-subject/teacher/{id}', [DetailSubjectController::class, 'updateBySubject']);

// detail research project
Route::get('/detail-research-project', [DetailResearchProjectController::class, 'getAll']);
Route::get('/detail-research-project/research-project/{id}', [DetailResearchProjectController::class, 'showByIdResearchProject']);
Route::get('/detail-research-project/teacher/{id}', [DetailResearchProjectController::class, 'showByIdTeacher']);
Route::post('/detail-research-project', [DetailResearchProjectController::class, 'create']);
Route::put('/detail-research-project/research-project/{id}', [DetailResearchProjectController::class, 'updateByResearchProject']);//loi

// detail scientific article
Route::get('/detail-scientific-article', [DetailScientificArticleController::class, 'getAll']);
Route::get('/detail-scientific-article/scientific-article/{id}', [DetailScientificArticleController::class, 'showByIdScientificArticle']);
Route::get('/detail-scientific-article/teacher/{id}', [DetailScientificArticleController::class, 'showByIdTeacher']);
Route::post('/detail-scientific-article', [DetailScientificArticleController::class, 'create']);
Route::put('/detail-scientific-article/scientific-article/{id}', [DetailScientificArticleController::class, 'updateByScientificArticle']);//loi

//teacher
Route::post('/teacher', [TeacherController::class, 'create']);

Route::get('/teacher', [TeacherController::class, 'getAll']);

Route::put('/teacher/{id}', [TeacherController::class, 'update']);

// work process
Route::get('work-process', [WorkProcessController::class, 'getAll']);
Route::get('work-process/{id}', [WorkProcessController::class, 'getById']);
Route::post('work-process/', [WorkProcessController::class, 'create']);
Route::put('work-process/{id}', [WorkProcessController::class, 'update']);
Route::delete('work-process/{id}', [WorkProcessController::class, 'destroy']);

//scientific_article
Route::get('scientific-article', [ScientificArticleController::class, 'getAll']);
Route::get('scientific-article/{id}', [ScientificArticleController::class, 'getById']);
Route::post('scientific-article/', [ScientificArticleController::class, 'create']);
Route::put('scientific-article/{id}', [ScientificArticleController::class, 'update']);
Route::delete('scientific-article/{id}', [ScientificArticleController::class, 'destroy']);

// research project
Route::get('research-project', [ResearchProjectController::class, 'getAll']);
Route::get('research-project/{id}', [ResearchProjectController::class, 'getById']);
Route::post('research-project/', [ResearchProjectController::class, 'create']);
Route::put('research-project/{id}', [ResearchProjectController::class, 'update']);
Route::delete('research-project/{id}', [ResearchProjectController::class, 'destroy']);
<?php
namespace App\Http\Middleware;
use Exception;
use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use Illuminate\Support\Facades\DB; 
use Illuminate\Support\Facades\Log; 

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
    {
        try {
            $token = $request->cookie('jwt_token');
            if (!$token) {
                throw new Exception('Token not found in header.');
            }
            $payload = JWTAuth::setToken($token)->authenticate();

            $email = str_replace('\\', '', $payload['email']);
            $id_user = str_replace('\\', '', $payload['id_user']);

            $user = DB::table('users')->where('id_user', $id_user)->where('email', $email)->first();
            if ($user->role === 1) {
                return $next($request);
            } else {
                return response()->json(['message' => 'You are not authorized to access this resource.'], 403);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}

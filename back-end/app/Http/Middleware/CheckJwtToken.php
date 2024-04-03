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

class CheckJwtToken
{
    public function handle($request, Closure $next)
    {
        try {
            
            $token = $request->cookie('jwt_token');

            error_log('JWT Token: ' . $token);

            if (!$token) {
                throw new Exception('Token not found in header.');
            }
            $payload = JWTAuth::setToken($token)->authenticate();

            $email = str_replace('\\', '', $payload['email']);
            $id_user = str_replace('\\', '', $payload['id_user']);

            $user = DB::table('users')->where('id_user', $id_user)->where('email', $email)->first();

            if (!$user) {
                throw new Exception('User not authenticated.');
            } else {
                $request->user_info = $user;
            }

            return $next($request);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}

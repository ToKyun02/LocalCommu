/**
 * 누구나 접근 가능한 라우팅 경로
 */
export const publicRoutes = ['/'];

/**
 * 로그인이 되어있어야만 접근 가능한 라우팅 경로
 */
export const protectedRoutes = ['/mypage'];

/**
 * 로그인이 되어있으면 해당 경로가 아닌 다른 경로로 라우팅 되어지는 피대상 라우팅 경로
 */
export const authRoutes = ['/login', '/signup', '/auth/error'];

/**
 * /api/auth 접두사로 라우팅 경로
 */
export const apiAuthPrefix = '/api/auth';

/**
 * 로그인 후 리다이렉트 할 라우팅 경로
 */
export const DEFAULT_LOGIN_REDIRECT = '/mypage';

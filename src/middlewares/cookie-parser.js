import cookie from 'cookie';

export function parserCookie(req, res, next) {
    const cookies = req.headers.cookie;
    req.parsedCookies = cookies ? cookie.parse(cookies) : null;
    next();
}
import url from 'url';
import queryString from 'querystring';

export function queryParser(req, res, next) {
    const { query } = url.parse(req.url);
    req.parsedQuery = query ? queryString.parse(query) : null;
    next();
}
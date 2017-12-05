import { UnauthorizedError as Jwt401Error } from 'express-jwt';

export default async function expressjwtHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
}

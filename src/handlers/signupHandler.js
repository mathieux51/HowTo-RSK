import jwt from 'jsonwebtoken';
import passport from '../passport';
import config from '../config';

export default async function signupHandler(req, res, next) {
  passport.authenticate('local-signup', (err, user, msg) => {
    if (err) {
      next(err);
    }
    if (msg) {
      res.json(msg);
    }
    if (!user) {
      res.json({ msg: 'User creation failed.' });
    }
    req.logIn(user, _err => {
      if (_err) {
        next(_err);
      }
      const expiresIn = 60 * 10; // 10min
      const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true, // Protect cookie on the client side
      });
      res.json({ user: req.user });
    });
    res.status(200).json({ status: 'ok' });
  })(req, res, next);
}

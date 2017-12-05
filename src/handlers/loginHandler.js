import jwt from 'jsonwebtoken';
import passport from '../passport';
import config from '../config';

export default function signupHandler(req, res, next) {
  passport.authenticate('local-login', (err, user, msg) => {
    if (err) next(err);
    if (msg) res.json(msg);
    if (!user) res.json({ msg: 'No user was found.' });

    req.logIn(user, _err => {
      if (_err) next(_err);

      const expiresIn = 60 * 20; // 10min
      const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true, // Protect cookie on the client side
      });
      res.json({ user: req.user });
    });
    // res.status(200).json({ status: 'ok' });
  })(req, res, next);
}

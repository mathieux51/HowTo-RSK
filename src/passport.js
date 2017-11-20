/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
import { v4 } from 'uuid';
import { User, UserLogin, UserClaim, UserProfile } from './data/models';
// import config from './config';

/**
 *Configuration and Settings
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById({ id });
  done(null, user);
});

/**
 * Login with email.
 */
passport.use(
  'local-login',
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({
          attributes: ['id', 'email', 'password'],
          where: { email: username },
        });
        if (!user) return done(null, false, { msg: 'No user found.' });
        const isValidPassword = await user.validPassword(password);
        if (!isValidPassword)
          return done(null, false, { msg: 'Oops! Wrong password.' });
        return done(null, {
          id: user.id,
          email: user.email,
        });
      } catch (err) {
        // if (err.name === 'SequelizeValidationError')
        //   return done(null, false, {
        //     msg: err.message,
        //   });
        return done(err);
      }
    },
  ),
);

/**
 * Signup with email.
 */
passport.use(
  'local-signup',
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, pwd, done) => {
      try {
        let user = await User.findOne({
          attributes: ['email'],
          where: { email: username },
        });
        if (user) {
          return done(null, false, {
            msg: 'Email adress already in use. Please try a different email.',
          });
        }
        const id = v4();
        const loginName = 'local';
        const claimType = 'urn:local:access_token'; // I don't know anythin about this!
        const password = await User.build().generateHash(pwd);
        user = await User.create(
          {
            id,
            email: username,
            password,
            logins: [{ name: loginName, key: id }],
            claims: [{ type: claimType, value: id }],
            profile: {
              displayName: username,
              gender: '',
              picture: '',
            },
          },
          {
            include: [
              { model: UserLogin, as: 'logins' },
              { model: UserClaim, as: 'claims' },
              { model: UserProfile, as: 'profile' },
            ],
          },
        );
        return done(null, {
          id: user.id,
          email: user.email,
        });
      } catch (err) {
        if (err.name === 'SequelizeValidationError')
          return done(null, false, {
            msg: err.message,
          });
        return done(err);
      }
    },
  ),
);

/**
 * Sign in with Facebook.
 */
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: config.auth.facebook.id,
//       clientSecret: config.auth.facebook.secret,
//       callbackURL: '/login/facebook/return',
//       profileFields: [
//         'displayName',
//         'name',
//         'email',
//         'link',
//         'locale',
//         'timezone',
//       ],
//       passReqToCallback: true,
//     },
//     (req, accessToken, refreshToken, profile, done) => {
//       /* eslint-disable no-underscore-dangle */
//       const loginName = 'facebook';
//       const claimType = 'urn:facebook:access_token';
//       const main = async () => {
//         if (req.user) {
//           const userLogin = await UserLogin.findOne({
//             attributes: ['name', 'key'],
//             where: { name: loginName, key: profile.id },
//           });
//           if (userLogin) {
//             console.warn(`There is already a Facebook account that belongs to you.'
//             Sign in with that account or delete it, then link it with your current account`);
//             done();
//           } else {
//             const user = await User.create(
//               {
//                 id: req.user.id,
//                 email: profile._json.email,
//                 logins: [{ name: loginName, key: profile.id }],
//                 claims: [{ type: claimType, value: profile.id }],
//                 profile: {
//                   displayName: profile.displayName,
//                   gender: profile._json.gender,
//                   picture: `https://graph.facebook.com/${
//                     profile.id
//                   }/picture?type=large`,
//                 },
//               },
//               {
//                 include: [
//                   { model: UserLogin, as: 'logins' },
//                   { model: UserClaim, as: 'claims' },
//                   { model: UserProfile, as: 'profile' },
//                 ],
//               },
//             );
//             done(null, {
//               id: user.id,
//               email: user.email,
//             });
//           }
//         } else {
//           const users = await User.findAll({
//             attributes: ['id', 'email'],
//             where: { '$logins.name$': loginName, '$logins.key$': profile.id },
//             include: [
//               {
//                 attributes: ['name', 'key'],
//                 model: UserLogin,
//                 as: 'logins',
//                 required: true,
//               },
//             ],
//           });
//           if (users.length) {
//             const user = users[0].get({ plain: true });
//             done(null, user);
//           } else {
//             let user = await User.findOne({
//               where: { email: profile._json.email },
//             });
//             if (user) {
//               // There is already an account using this email address. Sign in to
//               // that account and link it with Facebook manually from Account Settings.
//               done(null);
//             } else {
//               user = await User.create(
//                 {
//                   email: profile._json.email,
//                   emailConfirmed: true,
//                   logins: [{ name: loginName, key: profile.id }],
//                   claims: [{ type: claimType, value: accessToken }],
//                   profile: {
//                     displayName: profile.displayName,
//                     gender: profile._json.gender,
//                     picture: `https://graph.facebook.com/${
//                       profile.id
//                     }/picture?type=large`,
//                   },
//                 },
//                 {
//                   include: [
//                     { model: UserLogin, as: 'logins' },
//                     { model: UserClaim, as: 'claims' },
//                     { model: UserProfile, as: 'profile' },
//                   ],
//                 },
//               );
//               done(null, {
//                 id: user.id,
//                 email: user.email,
//               });
//             }
//           }
//         }
//       };

//       main().catch(done);
//     },
//   ),
// );

export default passport;

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { addController, upload } from 'controllers/addController';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import models from './data/models';
import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import config from './config';

const app = express();

// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// Register Node.js middleware
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Authentication
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);

// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

app.use(passport.initialize());

if (__DEV__) {
  app.enable('trust proxy');
}

// Facebook login
// app.get(
//   '/login/facebook',
//   passport.authenticate('facebook', {
//     scope: ['email', 'user_location'],
//     session: false,
//   }),
// );
//
// app.get(
//   '/login/facebook/return',
//   passport.authenticate('facebook', {
//     failureRedirect: '/login',
//     // failureFlash: 'Facebook authentification failed',
//     // successFlash: 'Successfully logged in with Facebook',
//     session: false,
//   }),
//   (req, res) => {
//     const expiresIn = 60 * 60 * 24 * 180; // 180 days
//     const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
//     res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
//     res.redirect('/');
//   },
// );

app.post('/signup/local', upload.fields([]), (req, res, next) => {
  passport.authenticate('local-signup', (err, user, msg) => {
    if (err) {
      return next(err);
    }
    if (msg) {
      return res.json(msg);
    }
    if (!user) {
      return res.json({ msg: 'User creation failed.' });
    }
    req.logIn(user, _err => {
      if (_err) {
        return next(_err);
      }
      const expiresIn = 60 * 10; // 10min
      const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true, // Protect cookie on the client side
      });
      return res.json({ user: req.user });
    });
    return res.status(200).json({ status: 'ok' });
  })(req, res, next);
});

app.post('/login/local', upload.fields([]), (req, res, next) => {
  passport.authenticate('local-login', (err, user, msg) => {
    if (err) {
      return next(err);
    }
    if (msg) {
      return res.json(msg);
    }
    if (!user) {
      return res.json({ msg: 'No user was found.' });
    }
    req.logIn(user, _err => {
      if (_err) {
        return next(_err);
      }
      const expiresIn = 60 * 10; // 10min
      const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true, // Protect cookie on the client side
      });
      return res.json({ user: req.user });
    });
    return res.status(200).json({ status: 'ok' });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('id_token');
  res.redirect('/');
});

// Register graphql API
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

// Gifs Upload
app.post('/add', upload.single('gifFile'), addController);

// Gifs delete

app.delete('admin/delete', (req, res) => {
  console.warn(req.user);
  console.warn(res);
});

// Register server-side rendering middleware
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Universal HTTP clientw
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
    });

    // // get userProfile
    // const resp = await fetch('/graphql', {
    //   body: JSON.stringify({
    //     query: '{userProfile{displayName,picture,gender,location,website}}',
    //   }),
    // });
    // const { data: userProfile } = await resp.json();

    const initialState = {
      userJwt: req.user || null,
      userProfile: null,
      history: {},
    };

    const store = configureStore(initialState, {
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
    });

    // store.dispatch(
    //   setRuntimeVariable({
    //     name: 'initialNow',
    //     value: Date.now(),
    //   }),
    // );
    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      fetch,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context} store={store}>
        {route.component}
      </App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

// Error handling
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

// Start sequelize
const promise = models.sync().catch(err => console.error(err.stack));

// 🎬 Start server
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

// 🌶 Hot Module Replacement
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;

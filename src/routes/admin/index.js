import React from 'react';
import Layout from '../../components/Layout';
import Admin from './Admin';
import { historyPush } from '../../actions/history';

const title = 'Admin Page';

function action(props) {
  const isAdmin =
    props.store.getState().userJwt.email === process.env.ADMIN_EMAIL;
  if (!isAdmin) {
    props.store.dispatch(
      historyPush({
        pathname: '/login',
        name: 'Login',
      }),
    );
  }

  return {
    chunks: ['admin'],
    title,
    component: (
      <Layout>
        <Admin title={title} />
      </Layout>
    ),
  };
}

export default action;

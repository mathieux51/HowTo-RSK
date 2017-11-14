import React from 'react';
import Add from './Add';
import Layout from '../../components/Layout';
import { historyPush } from '../../actions/history';

async function action(props) {
  // Have to be logged in to add a gif
  // https://github.com/kriasoft/react-starter-kit/issues/870#issuecomment-263114064
  if (!props.store.getState().userProfile.displayName) {
    props.store.dispatch(
      historyPush({
        pathname: '/login',
        name: 'Login',
      }),
    );
  }
  return {
    chunks: ['add'],
    title: 'Add',
    component: (
      <Layout>
        <Add {...props} />
      </Layout>
    ),
  };
}

export default action;

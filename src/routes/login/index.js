import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

function action(props) {
  return {
    chunks: ['login'],
    title: 'Add',
    component: (
      <Layout>
        <Login fetch={props.fetch} />
      </Layout>
    ),
  };
}

export default action;

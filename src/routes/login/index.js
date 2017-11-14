import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

function action() {
  return {
    chunks: ['login'],
    component: (
      <Layout>
        <Login />
      </Layout>
    ),
  };
}

export default action;

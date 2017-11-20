import React from 'react';
import Layout from '../../components/Layout';
import Register from './Register';

function action(props) {
  return {
    chunks: ['register'],
    component: (
      <Layout>
        <Register fetch={props.fetch} />
      </Layout>
    ),
  };
}

export default action;

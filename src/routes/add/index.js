import React from 'react';
import Add from './Add';
import Layout from '../../components/Layout';

async function action(props) {
  // async function action({ fetch }) {
  // const resp = await fetch('/graphql', {
  //   body: JSON.stringify({
  //     query: '{news{title,link,content}}',
  //   }),
  // });
  // const { data } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');
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

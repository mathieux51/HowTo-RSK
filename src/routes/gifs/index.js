import React from 'react';
import Gifs from './Gifs';
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
    chunks: ['gifs'],
    title: 'Gifs',
    component: (
      <Layout>
        <Gifs {...props} />
      </Layout>
    ),
  };
}

export default action;

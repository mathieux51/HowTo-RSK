import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{gifs{id,title,location}}',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.gifs) throw new Error('Failed to load the gifs.');
  return {
    chunks: ['home'],
    title: 'Home',
    component: (
      <Layout>
        <Home gifs={data.gifs} />
      </Layout>
    ),
  };
}

export default action;

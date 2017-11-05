import React from 'react';
import Gif from './Gif';
import Layout from '../../components/Layout';

async function action({ params, fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `{
        gif(id: "${params.id}"){
          id,
          title,
          description,
          location
        }
      }`,
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.gif) {
    console.warn(data);
    throw new Error('Failed to load the gif information.');
  }
  return {
    chunks: ['gif'],
    title: 'Gif',
    component: (
      <Layout>
        <Gif gif={data.gif} />
      </Layout>
    ),
  };
}

export default action;

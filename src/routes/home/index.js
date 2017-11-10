import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { setField } from '../../actions/setField';

async function action({ fetch, store }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `
        {
          gifs {
            id,
            title,
            description,
            location,
            createdBy
          }
          userProfile {
            displayName,
            picture,
            gender,
            location,
            website
          }
        }`,
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.gifs || !data.userProfile)
    throw new Error('Failed to load gifs and/or userProfile.');
  store.dispatch(setField(data.userProfile, 'USER_PROFILE'));
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

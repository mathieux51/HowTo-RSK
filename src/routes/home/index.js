import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { setField } from '../../actions/setField';

async function action(props) {
  const query = props.store.getState().userJwt
    ? `{gifs {id,title,description,location,createdBy}userProfile {displayName,picture,gender,location,website}}`
    : `{gifs {id,title,description,location,createdBy}}`;

  const resp = await props.fetch('/graphql', {
    body: JSON.stringify({
      query,
    }),
  });
  const { data } = await resp.json();

  if (!data || !data.gifs || !data.userProfile)
    console.error('Failed to load gifs and/or userProfile.');
  if (data.userProfile)
    props.store.dispatch(setField(data.userProfile, 'USER_PROFILE'));
  return {
    chunks: ['home'],
    title: 'Home',
    component: (
      <Layout>
        <Home gifs={data.gifs} fetch={props.fetch} />
      </Layout>
    ),
  };
}

export default action;

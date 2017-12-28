import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';
import { setField } from '../../actions/setField';

async function action(props) {
  const query = props.store.getState().userJwt
    ? '{gifs {id,title,description,location,created_by}userProfile {displayName,picture,gender,location,website}}'
    : '{gifs {id,title,description,location,created_by}}';

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
  if (data.gifs) props.store.dispatch(setField(data.gifs, 'GIFS'));
  return {
    chunks: ['home'],
    title: 'Home',
    component: (
      <Layout>
        <Home fetch={props.fetch} />
      </Layout>
    ),
  };
}

export default action;

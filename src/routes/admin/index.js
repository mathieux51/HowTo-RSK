import React from 'react';
import Layout from '../../components/Layout';
import Admin from './Admin';
import { historyPush } from '../../actions/history';

const title = 'Admin Page';

async function action(props) {
  const { userJwt } = props.store.getState();
  if (!(userJwt && userJwt.admin)) {
    props.store.dispatch(
      historyPush({
        pathname: '',
        name: 'Home',
      }),
    );
  }

  const query = '{gifs {id,title,description,location,createdBy}}';
  const resp = await props.fetch('/graphql', {
    body: JSON.stringify({
      query,
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.gifs)
    console.error('Failed to load gifs and/or userProfile.');
  return {
    chunks: ['admin'],
    title,
    component: (
      <Layout>
        <Admin title={title} gifs={data.gifs} />
      </Layout>
    ),
  };
}

export default action;

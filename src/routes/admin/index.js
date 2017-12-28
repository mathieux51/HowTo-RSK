import React from 'react';
import Layout from '../../components/Layout';
import Admin from './Admin';
import { historyPush } from '../../actions/history';
import { setField } from '../../actions/setField';

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

  const query = '{gifs {id,title,description,location,created_by}}';
  const resp = await props.fetch('/graphql', {
    body: JSON.stringify({
      query,
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.gifs) console.error('Failed to load gifs.');
  if (data.gifs) props.store.dispatch(setField(data.gifs, 'GIFS'));
  return {
    chunks: ['admin'],
    title,
    component: (
      <Layout>
        <Admin title={title} fetch={props.fetch} />
      </Layout>
    ),
  };
}

export default action;

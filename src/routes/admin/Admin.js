import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import {
  Container,
  Grid,
  Image,
  Card,
  Header,
  Button,
  Segment,
} from 'semantic-ui-react';
import { historyPush } from 'actions/history';
import { setField } from 'actions/setField';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Admin.css';

class Admin extends React.Component {
  static propTypes = {
    title: string.isRequired,
    gifs: arrayOf(
      shape({
        id: string.isRequired,
        title: string.isRequired,
        location: string.isRequired,
        description: string,
        createdBy: string,
      }),
    ).isRequired,
    fetch: func.isRequired,
    historyPush: func.isRequired,
    setField: func.isRequired,
  };
  state = {
    selectedGifs: [],
  };
  handleToggle = (evt, { id }) => {
    let selectedGifs = null;
    const found = this.state.selectedGifs.find(x => x === id);
    if (!found) {
      selectedGifs = this.state.selectedGifs.concat(id);
    } else selectedGifs = this.state.selectedGifs.filter(x => x !== id);
    this.setState({ selectedGifs });
  };

  handleDelete = () => {
    const { selectedGifs } = this.state;
    if (selectedGifs.length) {
      const body = new FormData();
      body.append('selectedGifs', selectedGifs);
      this.props
        .fetch('admin/delete', {
          method: 'DELETE',
          credentials: 'same-origin', // https://stackoverflow.com/questions/34734208/cookies-not-being-stored-with-fetch,
          body,
        })
        .then(res => res.json())
        .then(({ status }) => {
          if (status === 'ok') {
            const query = '{gifs {id,title,description,location,createdBy}}';
            this.props.fetch('/graphql', {
              body: JSON.stringify({
                query,
              }),
            });
          }
        })
        .then(res => res.json())
        .then(({ data }) => data.gifs && this.props.setField(data.gifs, 'GIFS'))
        .catch(console.error);
    }
  };
  render() {
    const { gifs } = this.props;
    return (
      <Container>
        <Header as="h3" content={this.props.title} textAlign="center" />
        <Grid container columns={3} doubling stackable centered>
          {gifs &&
            gifs.map(gif => {
              const selected = this.state.selectedGifs.find(x => x === gif.id);
              return (
                <Grid.Column key={gif.id}>
                  <Segment>
                    <Card
                      centered
                      onClick={() =>
                        this.props.historyPush({
                          pathname: `gif/${gif.id}`,
                          name: 'Gif',
                        })
                      }
                    >
                      <Image size="medium" src={gif.location} />
                      <Card.Content>{gif.title}</Card.Content>
                    </Card>
                    <Button
                      toggle
                      icon="trash"
                      id={gif.id}
                      active={!selected}
                      color={!selected ? 'green' : 'yellow'}
                      onClick={this.handleToggle}
                    />
                  </Segment>
                </Grid.Column>
              );
            })}
        </Grid>
        <Grid container centered style={{ margin: '20px 20px' }}>
          <Grid.Row>
            <Button
              color="red"
              attached="bottom"
              content="Delete"
              onClick={this.handleDelete}
              onKeyPress={this.handleDelete}
            />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  gifs: state.gifs,
});

const mapDispatchToProps = dispatch => ({
  historyPush: _history => dispatch(historyPush(_history)),
  setField: (...args) => dispatch(setField(...args)),
});

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps),
)(Admin);

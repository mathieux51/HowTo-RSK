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
    historyPush: func.isRequired,
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
        <Grid container style={{ margin: '20px 20px' }}>
          <Grid.Column>
            <Button
              color="red"
              attached="bottom"
              content="Delete"
              onClick={this.handleDelete}
              onKeyPress={this.handleDelete}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  historyPush: _history => dispatch(historyPush(_history)),
});

export default compose(
  withStyles(s),
  connect(state => state, mapDispatchToProps),
)(Admin);

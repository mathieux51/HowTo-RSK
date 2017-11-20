import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { string, arrayOf, shape, func } from 'prop-types';
import {
  Container,
  Card,
  Image,
  Button,
  Header,
  Segment,
  Grid,
} from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import SearchGifs from '../../components/SearchGifs/SearchGifs';
import history from '../../history';

class Home extends React.Component {
  static propTypes = {
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
  };
  render() {
    const { gifs } = this.props;
    return (
      <Container>
        <div className={s.margin}>
          <Header as="h3" content="Getting Started" textAlign="center" />
        </div>
        <div className={s.margin}>
          <Grid container columns={2} relaxed stackable>
            <Grid.Column>
              <Segment>
                <SearchGifs fetch={this.props.fetch} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Button
                  color="blue"
                  content="Add a new gif"
                  icon="add"
                  labelPosition="right"
                  onClick={() => history.push('/add')}
                />
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
        <div className={s.margin}>
          <Header
            as="h3"
            content="Random Selection"
            textAlign="center"
            className={s.margin}
          />
        </div>
        <div className={s.margin}>
          <Grid container columns={3} doubling stackable centered>
            {gifs &&
              gifs.map(gif => (
                <Grid.Column key={gif.id}>
                  <Card onClick={() => history.push(`gif/${gif.id}`)}>
                    <Image size="medium" src={gif.location} />
                    <Card.Content>{gif.title}</Card.Content>
                  </Card>
                </Grid.Column>
              ))}
          </Grid>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

export default compose(withStyles(s), connect(mapStateToProps))(Home);

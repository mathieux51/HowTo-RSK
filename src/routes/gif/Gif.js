import React from 'react';
import PropTypes from 'prop-types';
import { Container, Image } from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Gif.css';

class Gif extends React.Component {
  static propTypes = {
    gif: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <Container>
        <h1>{this.props.gif.title}</h1>
        <Image src={`/${this.props.gif.location}`} fluid />
        <p>{this.props.gif.description}</p>
      </Container>
    );
  }
}

export default withStyles(s)(Gif);

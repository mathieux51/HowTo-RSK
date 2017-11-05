import React from 'react';
import PropTypes from 'prop-types';
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
      <div className={s.root}>
        <div className={s.container}>
          <div>
            <h1>{this.props.gif.title}</h1>
            <img
              className={s.img}
              src={`/${this.props.gif.location}`}
              alt="gif"
            />
            <p>{this.props.gif.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Gif);

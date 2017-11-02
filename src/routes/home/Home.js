import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'components/Link';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    gifs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Random selection</h1>
          <div className={s.main}>
            {this.props.gifs.map(gif => (
              <Link className={s.link} to={`gif/${gif.id}`} key={gif.id}>
                <img className={s.img} src={gif.location} alt="gif" />
                <p>{gif.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);

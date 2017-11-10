import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from 'components/Link';
import s from './Home.css';

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
  };
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Getting Started</h1>
          <Link className={''} to="/add">
            <p>Add a new gif</p>
          </Link>
          <h1>Random Selection</h1>
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

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

export default compose(withStyles(s), connect(mapStateToProps))(Home);

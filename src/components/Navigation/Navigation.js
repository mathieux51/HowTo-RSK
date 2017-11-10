import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  static defaultProps = {
    userProfile: {},
  };
  static propTypes = {
    userProfile: PropTypes.shape({
      displayName: PropTypes.string,
      picture: PropTypes.string,
    }),
  };
  render() {
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">
          About
        </Link>
        <Link className={s.link} to="/contact">
          Contact
        </Link>
        <span className={s.spacer}> | </span>

        {this.props.userProfile.displayName ? (
          <span>
            <img
              className={s.img}
              src={this.props.userProfile.picture}
              alt="Facebook"
            />
            <a className={s.p} href="/logout">
              {this.props.userProfile.displayName}
            </a>
          </span>
        ) : (
          <span>
            <Link className={s.link} to="/login">
              Log in
            </Link>
            <span className={s.spacer}>or</span>
            <Link className={cx(s.link, s.highlight)} to="/register">
              Sign up
            </Link>
          </span>
        )}
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  connect(state => ({
    userProfile: state.userProfile,
  })),
)(Navigation);

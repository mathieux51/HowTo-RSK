import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { shape, func, string } from 'prop-types';
import { Menu } from 'semantic-ui-react';
// import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { historyPush } from 'actions/history';
import history from '../../history';
import s from './Navigation.css';

class Navigation extends React.Component {
  static propTypes = {
    userJwt: shape({
      email: string,
      id: string,
    }),
    historyPush: func.isRequired,
    history: shape({
      pathname: string,
      name: string,
    }).isRequired,
  };
  static defaultProps = {
    userJwt: {},
  };

  componentDidMount = () => {
    const { pathname } = history.location;
    this.props.historyPush({
      pathname,
      name: this.getPathName(pathname) || 'Home',
    });
  };

  getPathName = name => {
    const rmSlash = name.split('/')[1];
    return rmSlash.charAt(0).toUpperCase() + rmSlash.slice(1);
  };

  handleClick = (evt, { name }) => {
    evt.stopPropagation();
    evt.preventDefault();
    const isHome = name === '/home';
    const pathname = isHome ? '' : name;
    if (pathname === this.props.history.pathname) return; // Prevent action dispatch if already on the right route
    this.props.historyPush({
      pathname,
      name: isHome ? 'Home' : this.getPathName(pathname),
    });
  };

  render() {
    const { name } = this.props.history;
    return (
      <div>
        <Menu tabular>
          <Menu.Item
            name="/home"
            active={name === 'Home'}
            onClick={this.handleClick}
          />
          <Menu.Item
            name="/add"
            active={name === 'Add'}
            onClick={this.handleClick}
          />
          {this.props.userJwt ? (
            <Menu.Item position="right">
              <a href="/logout">Logout</a>
            </Menu.Item>
          ) : (
            <Menu.Item
              position="right"
              name="/login"
              active={name === 'Login'}
              onClick={this.handleClick}
            />
          )}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userJwt: state.userJwt,
  history: state.history,
});

const mapDispatchToProps = dispatch => ({
  historyPush: _history => dispatch(historyPush(_history)),
});

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps),
)(Navigation);

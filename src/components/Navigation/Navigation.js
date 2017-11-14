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
    userProfile: shape({
      displayName: string,
      picture: string,
    }),
    historyPush: func.isRequired,
    history: shape({
      pathname: string,
      name: string,
    }).isRequired,
  };
  static defaultProps = {
    userProfile: {},
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
    // console.warn('name', name)
    const isHome = name === '/home';
    const pathname = isHome ? '' : name;
    this.props.historyPush({
      pathname,
      name: isHome ? 'Home' : this.getPathName(pathname),
    });
  };

  render() {
    const { name } = this.props.history;
    const { displayName } = this.props.userProfile;
    // const { displayName, picture } = this.props.userProfile;
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
          <Menu.Item
            name="/about"
            active={name === 'About'}
            onClick={this.handleClick}
          />
          {displayName ? (
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
  userProfile: state.userProfile,
  history: state.history,
});

const mapDispatchToProps = dispatch => ({
  historyPush: _history => dispatch(historyPush(_history)),
});

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps),
)(Navigation);

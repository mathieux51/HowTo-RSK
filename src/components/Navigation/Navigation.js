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

  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.state = {
      showAdminLink: false,
      count: 0,
    };
  }

  componentDidMount = () => {
    // Initiate Menu
    const { pathname } = history.location;
    this.props.historyPush({
      pathname,
      name: this.getPathName(pathname) || 'Home',
    });
    document.body.addEventListener('keyup', this.onKeyUp); // Reveal admin link
  };

  componentWillUnmount = () => {
    document.body.removeEventListener('keyup', this.onKeyUp); // Reveal admin link
  };

  // Reveal admin link
  onKeyUp = evt => {
    const { count } = this.state;
    if (evt.keyCode === 16) {
      if (count > 3) this.setState({ showAdminLink: true });
      else this.setState({ count: count + 1 });
    }
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
          {this.state.showAdminLink && (
            <Menu.Item
              name="/admin"
              active={name === 'Admin'}
              onClick={this.handleClick}
            />
          )}
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

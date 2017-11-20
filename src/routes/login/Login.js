import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import debounce from 'lodash/debounce';
import { Grid, Button, Form, Segment, Icon, Message } from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { historyPush } from '../../actions/history';
import { setField } from '../../actions/setField';
import s from './Login.css';

class Login extends React.Component {
  static propTypes = {
    fetch: func.isRequired,
    setField: func.isRequired,
    historyPush: func.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = debounce(this.handleSubmit.bind(this), 300);
    this.state = {
      login: true,
      hasEmail: false,
      hasPassword: false,
      msg: '',
    };
  }

  handleToggle = (evt, value) => {
    if (value.children === 'Login')
      if (!value.postive) this.setState({ login: true });

    if (value.children === 'Signup')
      if (!value.postive) this.setState({ login: false });
  };

  handleInputChange = (evt, { name, value }) => {
    if (name === 'username') {
      const hasEmail = Boolean(value.length);
      this.setState({ hasEmail });
    }
    if (name === 'password') {
      const hasPassword = Boolean(value.length);
      this.setState({ hasPassword });
    }
  };

  handleDismiss = () => {
    this.setState({ msg: '' });
  };

  async handleSubmit() {
    // evt.preventDefault();
    const form = document.querySelector('#loginForm');
    const loginForm = new FormData(form);
    const url = this.state.login ? '/login/local' : '/signup/local';
    const res = await this.props.fetch(url, {
      method: 'POST',
      credentials: 'same-origin', // https://stackoverflow.com/questions/34734208/cookies-not-being-stored-with-fetch
      body: loginForm,
    });
    const { user, msg } = await res.json();
    if (msg) {
      this.setState({ msg });
      return;
    }
    this.props.setField(user, 'USER_JWT');
    this.props.historyPush({
      name: 'Add',
      pathname: '/add',
    });
  }
  render() {
    return (
      <div className={s.container}>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Button.Group fluid>
                <Button positive={this.state.login} onClick={this.handleToggle}>
                  Login
                </Button>
                <Button.Or text="or" />
                <Button
                  positive={!this.state.login}
                  onClick={this.handleToggle}
                >
                  Signup
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
          {this.state.msg && (
            <Grid.Row>
              <Message warning onDismiss={this.handleDismiss}>
                <Message.Header>Signup unsuccessful</Message.Header>
                <p>{this.state.msg}</p>
              </Message>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form
                size="large"
                onSubmit={this.handleSubmit}
                id="loginForm"
                encType="multipart/form-data"
              >
                <Segment stacked>
                  <label htmlFor="loginForm">
                    <Form.Input
                      onChange={this.handleInputChange}
                      fluid
                      size="large"
                      icon="at"
                      iconPosition="left"
                      placeholder="E-mail address"
                      name="username"
                      id="username"
                    />
                  </label>
                  <label htmlFor="loginForm">
                    <Form.Input
                      onChange={this.handleInputChange}
                      fluid
                      size="large"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      name="password"
                      id="password"
                    />
                  </label>
                  <Button
                    color="blue"
                    fluid
                    size="large"
                    disabled={!(this.state.hasEmail && this.state.hasPassword)}
                  >
                    {this.state.login ? 'Login' : 'Signup'}
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>{' '}
          </Grid.Row>
          <Grid.Row>
            <Message warning>
              <Message.Header>Coming soon</Message.Header>
            </Message>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Button color="facebook" fluid disabled>
                <Icon name="facebook" /> Facebook
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Button color="twitter" fluid disabled>
                <Icon name="twitter" /> Twitter
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Button color="google plus" fluid disabled>
                <Icon name="google" /> Google
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history,
});

const mapDispatchToProps = dispatch => ({
  historyPush: _history => dispatch(historyPush(_history)),
  setField: (...args) => dispatch(setField(...args)),
});

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps),
)(Login);

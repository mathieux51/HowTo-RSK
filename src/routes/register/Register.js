import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Grid, Button, Form, Segment } from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { historyPush } from '../../actions/history';
// import { setField } from '../../actions/setField';

import s from './Register.css';

class Register extends React.Component {
  static propTypes = {
    fetch: func.isRequired,
    // setField: func.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const form = document.querySelector('#signupForm');
    const signupForm = new FormData(form);
    await this.props.fetch('/register/local', {
      method: 'POST',
      body: signupForm,
    });
    // setField
    // history.push(`gif/${id}`);
  }
  render() {
    return (
      <div className={s.container}>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form
              size="large"
              onSubmit={this.handleSubmit}
              id="signupForm"
              encType="multipart/form-data"
            >
              <Segment stacked>
                <label htmlFor="signupForm">
                  <Form.Input
                    size="large"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="username"
                    id="username"
                  />
                </label>
                <label htmlFor="signupForm">
                  <Form.Input
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
                <Button color="blue" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
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
  // setField: (...args) => dispatch(setField(...args)),
});

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps),
)(Register);

import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Button, Form, Segment } from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className={s.login}>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="blue" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            {/* <Button */}
            {/* color="blue" */}
            {/* content="New to us? Sign Up" */}
            {/* icon="signup" */}
            {/* labelPosition="right" */}
            {/* onClick={() => history.push('/add')} */}
            {/* /> */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withStyles(s)(Login);

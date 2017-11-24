import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import {
  Container,
  Button,
  Form,
  Icon,
  Header,
  Grid,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { historyPush } from 'actions/history';
// import debounce from 'lodash/debounce';

import s from './Add.css';

class Add extends React.Component {
  static propTypes = {
    fetch: func.isRequired,
    historyPush: func.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      hasFile: false,
      hasTitle: false,
      isFetching: false,
    };
  }

  handleStyle = evt => {
    const hasFile = Boolean(evt.target.files.length);
    this.setState({ hasFile });
  };

  handleTitle = evt => {
    const hasTitle = Boolean(evt.target.value.length);
    this.setState({ hasTitle });
  };

  async handleSubmit(evt) {
    try {
      evt.preventDefault();
      const form = document.querySelector('#postGif');
      const formData = new FormData(form);
      this.setState({ isFetching: true });
      const res = await this.props.fetch('/add', {
        method: 'POST',
        credentials: 'same-origin', // https://stackoverflow.com/questions/34734208/cookies-not-being-stored-with-fetch,
        body: formData,
      });
      const { id } = await res.json();
      this.setState({ isFetching: false });
      this.props.historyPush({
        name: 'Gif',
        pathname: `/gif/${id}`,
      });
    } catch (err) {
      this.setState({ isFetching: false });
    }
  }
  render() {
    const isValid = this.state.hasTitle && this.state.hasFile;
    return (
      <Container>
        <Form
          id="postGif"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <div className={s.margin}>
            <Header as="h3" content="Upload your gif" textAlign="center" />
          </div>
          <div className={s.margin}>
            <Grid container>
              <Grid.Column>
                <Segment
                  textAlign="center"
                  inverted
                  color={this.state.hasFile ? 'green' : undefined}
                >
                  {this.state.isFetching ? (
                    <Dimmer active>
                      <Loader>Loading</Loader>
                    </Dimmer>
                  ) : (
                    <Form.Field required>
                      <label htmlFor="gifFile" className={s.label}>
                        {this.state.hasFile ? (
                          <Icon
                            name="space shuttle"
                            size="huge"
                            className={s.space}
                          />
                        ) : (
                          <Icon name="upload" size="huge" />
                        )}
                        <input
                          onChange={this.handleStyle}
                          className={s.input}
                          type="file"
                          id="gifFile"
                          name="gifFile"
                          accept="image/gif"
                          tabIndex={0}
                        />
                      </label>
                    </Form.Field>
                  )}
                </Segment>
              </Grid.Column>
            </Grid>

            <Grid container columns={2} relaxed stackable>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="title">
                    Title
                    <input
                      onChange={this.handleTitle}
                      type="text"
                      id="title"
                      name="title"
                      placeholder="How to"
                    />
                  </label>
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.TextArea
                  label="Description"
                  placeholder="Describe what your gif is about (Helps for other user to it with search)."
                  id="description"
                  name="description"
                  form="postGif"
                />
              </Grid.Column>
            </Grid>
          </div>
          <Button
            size={isValid ? 'big' : 'small'}
            type="submit"
            disabled={!isValid}
            color={isValid ? 'blue' : undefined}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  historyPush: _history => dispatch(historyPush(_history)),
});

//   const mapStateToProps = state => ({
//   history: state.history,
// });

export default compose(
  withStyles(s),
  connect(state => state, mapDispatchToProps),
)(Add);

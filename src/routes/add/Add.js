import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Form,
  Icon,
  Header,
  Grid,
  Segment,
} from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../history';
import s from './Add.css';

class Add extends React.Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      hasFile: false,
      hasTitle: false,
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
    evt.preventDefault();
    const form = document.querySelector('#postGif');
    const formData = new FormData(form);
    const { id } = await this.props.fetch('/add', {
      method: 'POST',
      body: formData,
    });
    history.push(`gif/${id}`);
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
                </Segment>
              </Grid.Column>
            </Grid>

            <Grid container columns={2} relaxed stackable>
              <Grid.Column>
                <Form.Field required>
                  {/* eslint-disable-next-line label-has-for */}
                  <label htmlFor="title">Title</label>
                  <input
                    onChange={this.handleTitle}
                    type="text"
                    id="title"
                    name="title"
                    placeholder="How to"
                  />
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

export default withStyles(s)(Add);

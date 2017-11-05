import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../history';
import s from './Add.css';

class Add extends React.Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = document.querySelector('#postGif');
    const formData = new FormData(form);
    this.props
      .fetch('/add', {
        method: 'POST',
        body: formData,
      })
      .then(res => res.json())
      .then(({ id }) => history.push(`gif/${id}`));
  };
  render() {
    return (
      <div className={s.root}>
        <div className={s.container} />
        <form
          id="postGif"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <div className={s.div}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="How to"
                required
                tabIndex={0}
              />
            </label>
          </div>
          <div className={s.div}>
            <label htmlFor="gif">
              Your Gif
              <input
                type="file"
                id="gifFile"
                name="gifFile"
                accept="image/gif"
                required
              />
            </label>
          </div>
          <div className={s.div}>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                form="postGif"
                placeholder="How to"
              />
            </label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Add);

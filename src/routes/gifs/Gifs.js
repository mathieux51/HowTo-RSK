import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Gifs.css';

class Gifs extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container} />
        <form id="postGif" encType="multipart/form-data" method="post">
          <div className={s.div}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="How to"
              required
            />
          </div>
          <div className={s.div}>
            <label htmlFor="gif">Your Gif</label>
            <input
              type="file"
              id="gifFile"
              name="gifFile"
              accept="image/gif"
              required
            />
          </div>
          <div className={s.div}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              form="postGif"
              placeholder="How to"
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Gifs);

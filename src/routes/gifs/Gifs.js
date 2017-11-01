import React from 'react';
import { func } from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Gifs.css';

class Gifs extends React.Component {
  static propTypes = {
    fetch: func.isRequired,
  };
  handleOnChange = evt => {
    const formData = new FormData();
    formData.append('gifInput', evt.target.files[0]);
    this.props.fetch('/test', {
      method: 'POST',
      body: formData,
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container} />
        <input type="file" accept="image/gif" onChange={this.handleOnChange} />
      </div>
    );
  }
}

export default withStyles(s)(Gifs);

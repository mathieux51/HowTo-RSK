import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.css';

class Feedback extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <a
            className={s.link}
            href="https://join.slack.com/t/howtoworkspace/shared_invite/enQtMjY4MDgxODk5ODE1LTI5OGVkNzcxYjlmZjg2YTA3MzIxOTBhNTg3MzA3NjkxODFkOWFhZDg1ZTE0OGYyMWE2NDRiOWVlMTYwNjlkMDE"
          >
            Ask a question
          </a>
          <span className={s.spacer}>|</span>
          <a
            className={s.link}
            href="https://github.com/mathieux51/HowTo-RSK/issues/new"
          >
            Report an issue
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);

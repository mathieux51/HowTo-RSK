import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.text}>HowTo</span>
          <span className={s.spacer}>·</span>
          <Link className={s.link} href="/">
            Home
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} href="/admin">
            Admin
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} href="/privacy">
            Privacy
          </Link>
          <span className={s.spacer}>·</span>
          <Link className={s.link} href="/not-found">
            Not Found
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);

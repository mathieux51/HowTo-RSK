import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Container } from 'semantic-ui-react';
import s from './Header.css';
import Navigation from '../Navigation';

class Header extends React.Component {
  render() {
    return (
      <Container className={s.container}>
        <Navigation />
      </Container>
    );
  }
}

export default withStyles(s)(Header);

// <img
//  src={logoUrl}
//  srcSet={`${logoUrl2x} 2x`}
//  width="38"
//  height="38"
//  alt="React"
// />

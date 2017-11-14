import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
// Not need for normalize, semantic takes care of it.
// import normalizeCss from 'normalize.css';
import { Container } from 'semantic-ui-react';
import semantic from 'semantic-ui-css/semantic.min.css';
import s from './Layout.css';
import Header from '../Header';
// import Feedback from '../Feedback';
// import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <Container>
        <Header />
        {this.props.children}
        {/* <Feedback /> */}
        {/* <Footer /> */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

export default compose(withStyles(s, semantic), connect(mapStateToProps))(
  Layout,
);

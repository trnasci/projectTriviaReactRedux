import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  gamePath = () => {
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    return (
      <div><LoginForm gamePath={ this.gamePath } /></div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import requestToken from '../api';

export default class Login extends Component {
  getToken = async () => {
    const token = await requestToken();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    return (
      <div><LoginForm getToken={ this.getToken } /></div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

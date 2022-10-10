import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import requestToken from '../api';
import Settings from '../pages/Settings';
import SUBMIT_USER_PROFILE from '../redux/actions';

class LoginForm extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
    settings: false,
    isGame: false,
  };

  pegarToken = async () => {
    const token = await requestToken();
    localStorage.setItem('token', token);
  };

  changeToSettings = () => {
    this.setState({ settings: true });
  };

  changeToPlay = async () => {
    const { dispatch } = this.props;
    const { email, name } = this.state;
    await this.pegarToken();
    const action = { type: SUBMIT_USER_PROFILE, payload: { name, gravatarEmail: email } };
    this.setState({ isGame: true });
    dispatch(action);
  };

  validateLogin = () => {
    const { name, email } = this.state;
    this.setState({ isDisabled: !(name.length > 0 && email.length > 0) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateLogin);
  };

  render() {
    const { name, email, isDisabled, settings, isGame } = this.state;
    if (settings === true) {
      return <Settings />;
    }
    if (isGame === true) {
      const { gamePath } = this.props;
      gamePath();
    }

    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ () => this.changeToPlay() }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.changeToSettings() }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  getToken: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(LoginForm);

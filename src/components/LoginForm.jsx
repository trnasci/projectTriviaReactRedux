import React, { Component } from 'react';
import Settings from '../pages/Settings';

export default class LoginForm extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
    settings: false,
  };

  changeToSettings = () => {
    this.setState({ settings: true });
  };

  validateLogin = () => {
    const { name, email } = this.state;
    this.setState({ isDisabled: !(name.length > 0 && email.length > 0) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateLogin);
  };

  render() {
    const { name, email, isDisabled, settings } = this.state;
    if (settings === true) {
      return <Settings />;
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

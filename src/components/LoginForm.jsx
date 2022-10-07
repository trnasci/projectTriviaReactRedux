import React, { Component } from 'react';

export default class LoginForm extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  validateLogin = () => {
    const { name, email } = this.state;
    this.setState({ isDisabled: !(name.length > 0 && email.length > 0) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateLogin);
  };

  render() {
    const { name, email, isDisabled } = this.state;
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
        </form>
      </div>
    );
  }
}

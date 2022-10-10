import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página Login', () => {
  test('Verifica se existem dois botões play e settings', () => {
    renderWithRouterAndRedux(<Login />);
    const buttonPlay = screen.getByTestId('btn-play');
    const buttonSettings = screen.getByTestId('btn-settings');

    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  })

  test('Verifica se existe um input de email', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, 'rafa@gmail.com');

    expect(email).toBeInTheDocument();
  });

  test('Verifica se existe um input de texto', () => {
    renderWithRouterAndRedux(<Login />);

    const textInput = screen.getByTestId('input-player-name');
    userEvent.type(textInput, 'Rafael');

    expect(textInput).toBeInTheDocument();
  });

   test('Verifica o history.push', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const textInput = screen.getByTestId('input-player-name');
    userEvent.type(textInput, 'Rafael');

    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, 'rafa@gmail.com');

    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).not.toBeDisabled()
    userEvent.click(buttonPlay);
    const game = await screen.findByText(/game/i, {}, {timeout: 2000})
    console.log(game);
    expect(game).toBeInTheDocument();
      expect(history.location.pathname).toBe('/game');
  })
})

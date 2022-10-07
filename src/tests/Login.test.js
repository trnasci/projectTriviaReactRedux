import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página Login', () => {
  test('Verifica se existe um botão', () => {
    renderWithRouterAndRedux(<Login />);
    const button = screen.getByRole('button', { type: 'button' });

    expect(button).toBeInTheDocument();
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
})

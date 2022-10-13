import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Feedback from '../pages/Feedback'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

const initialState = {
  token: "mockedToken",
  player: {
    name: 'Carlos Márcio',
    gravatarEmail: 'carlosmarcio@email.com',
    score: 104,
    assertions: 3,
  }
}

describe('Testa a página Feedback.', () => {
  it('01 - Testa o título da página', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByRole('heading', { name: /feedback/i })).toBeDefined();
  })
  it('02 - Testa se o botão Play again leva a rota "/".', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const playAgain = screen.getByTestId('btn-play-again');
    userEvent.click(playAgain);
    expect(history.location.pathname).toBe('/');
  })
  it('03 - Testa se o botão Ranking again leva a rota "/ranking".', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const ranking = screen.getByTestId('btn-ranking');
    userEvent.click(ranking);
    expect(history.location.pathname).toBe('/ranking');
  })
  it('03 - Testa o nexo entre mensagem de feedback, score e assertions.', () => {
    renderWithRouterAndRedux(<Feedback />, initialState);
    const feedbackMsg = screen.getByTestId('feedback-text');
    const scoreMsg = screen.getByTestId('feedback-total-score');
    const assertionsMsg = screen.getByTestId('feedback-total-question');
    expect(feedbackMsg.innerHTML).toBe('Well Done!');
    expect(scoreMsg.innerHTML).toBe('104');
    expect(assertionsMsg.innerHTML).toBe('3');
  })
})
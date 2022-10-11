import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    data: [],
    question: 0,
    colors: false,
    time: 30,
    correctAnswer: '',
    answers: [],
    wrongs: [],
    timedOut: false,
  };

  componentDidMount() {
    this.requestGame();
    this.gameTimer();
  }

  requestGame = async () => {
    const token = localStorage.getItem('token');
    const min = 3;
    const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const triviaData = await result.json();
    if (triviaData.response_code === min) {
      localStorage.setItem('token', '');
      const { history } = this.props;
      history.push('/');
    }
    this.setState({ data: triviaData.results }, () => {
      const { question, data } = this.state;
      this.setState({
        correctAnswer: data[question].correct_answer,
        answers: this.shuffle([
          ...data[question].incorrect_answers, data[question].correct_answer]),
      }, () => {
        const { answers, correctAnswer } = this.state;
        const wrongs = answers
          .filter((e) => !e.match(correctAnswer));
        this.setState({ wrongs });
      });
    });
  };

  mudarCor = () => {
    this.setState({ colors: true });
  };

  gameTimer = () => {
    const SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState(({ time }) => ({ time: time - 1 }), () => {
        const { time } = this.state;
        if (time === 0) {
          this.setState({ timedOut: true });
          clearInterval(this.timer);
        }
      });
    }, SECOND);
  };

  shuffle = (array) => {
    let currentIndex = array.length; let
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
    // Referência: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  };

  render() {
    const {
      data,
      question,
      colors,
      answers,
      correctAnswer,
      wrongs,
      time,
      timedOut } = this.state;
    if (correctAnswer) console.log(correctAnswer);
    return (
      <div>
        <Header />
        {
          data.length > 0 && (
            <div>
              <h2 data-testid="question-category">{data[question].category}</h2>
              <h1 data-testid="question-text">{data[question].question}</h1>
              <div data-testid="answer-options">
                {
                  answers.map((e) => (
                    <button
                      key={ e }
                      data-testid={
                        e.match(correctAnswer)
                          ? 'correct-answer' : `wrong-answer-${wrongs.indexOf(e)}`
                      }
                      className={ colors
                        ? (`${e.match(correctAnswer)
                          ? 'correct' : 'wrong'}-answer`) : '' }
                      type="button"
                      disabled={ timedOut }
                      onClick={ this.mudarCor }
                    >
                      {e}
                    </button>
                  ))
                }
              </div>
              <p>{time}</p>
            </div>)
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

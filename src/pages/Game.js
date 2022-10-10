import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    data: [],
    question: 0,
  };

  componentDidMount() {
    this.requestGame();
  }

  requestGame = async () => {
    const token = localStorage.getItem('token');
    try {
      const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await result.json();
      this.setState({ data: data.results });
    } catch (e) {
      localStorage.setItem('token', '');
    }
  };

  shuffle = (array) => {
    let currentIndex = array.length; let
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  render() {
    const { data, question } = this.state;
    return (
      <div>
        <Header />
        {
          data.length > 0 && (
            <div>
              <h2 data-testid="question-category">{data[question].category}</h2>
              <h1 data-testid="question-text">{data[question].question}</h1>
              <ul>
                {
                  this.shuffle([
                    ...data[question].incorrect_answers, data[question].correct_answer]
                    .map((cadaResposta, i, a) => (
                      <li
                        key={ cadaResposta }
                        data-testid={
                          `${i === a.length - 1
                            ? 'correct' : 'wrong'}-answer${i === a.length - 1
                            ? '' : `-${i}`}`
                        }
                      >
                        <button type="button">{cadaResposta}</button>
                      </li>)))
                }
              </ul>
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

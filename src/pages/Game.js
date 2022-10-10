import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    data: [],
    question: 0,
    colors: false,
  };

  componentDidMount() {
    this.requestGame();
  }

  requestGame = async () => {
    const token = localStorage.getItem('token');
    const min = 3;
    const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await result.json();
    if (data.response_code === min) {
      localStorage.setItem('token', '');
      const { history } = this.props;
      history.push('/');
    }
    this.setState({ data: data.results });
  };

  mudarCor = ({ target }) => {
    console.log(target);
    this.setState({ colors: true });
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
    const { data, question, colors } = this.state;
    return (
      <div>
        <Header />
        {
          data.length > 0 && (
            <div>
              <h2 data-testid="question-category">{data[question].category}</h2>
              <h1 data-testid="question-text">{data[question].question}</h1>
              <ul data-testid="answer-options">
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
                        className={ colors
                          ? (`${i === a.length - 1
                            ? 'correct' : 'wrong'}-answer`) : '' }
                      >
                        <button
                          type="button"
                          onClick={ this.mudarCor }
                        >
                          {cadaResposta}
                        </button>
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

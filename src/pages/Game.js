import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

export default class Game extends Component {
  state = {
    data: [],
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
      const { history } = this.props;
      localStorage.setItem('token', '');
      history.push('/');
    }
    console.log(data.results);
  };

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

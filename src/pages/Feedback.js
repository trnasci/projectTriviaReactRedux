import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        {
          assertions < three
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

function mapStateToProps(state) {
  return { ...state.player };
}

export default connect(mapStateToProps)(Feedback);

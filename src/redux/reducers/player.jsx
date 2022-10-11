import { ANSWER_SCORE, SUBMIT_USER_PROFILE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_USER_PROFILE:
    return { ...state, ...action.payload };
  case ANSWER_SCORE:
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
}

export default player;

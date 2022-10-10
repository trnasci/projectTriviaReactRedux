import SUBMIT_USER_PROFILE from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '0',
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_USER_PROFILE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default player;

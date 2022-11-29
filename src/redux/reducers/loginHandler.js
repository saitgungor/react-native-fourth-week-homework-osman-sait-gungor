import * as constants from '../constants';

const initialState = {
  isLogged: false,
};
const loginHandlerReducer = (state = initialState, actionObj) => {
  switch (actionObj.type) {
    case constants.LOGIN_HANDLER: {
      return {...state, isLogged: true};
    }
    default:
      return state;
  }
};

export {loginHandlerReducer};

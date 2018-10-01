import { combineReducers } from 'redux';

import auth from './auth.reducer';
import parse from './parse.reducer';
import profile from './profile.reducer';
import board from './board.reducer';
import pin from './pin.reducer';
import { alert } from './alert.reducer';

// var myExports = require('./auth.reducer');
// console.log(Object.keys(myExports));


const rootReducer = combineReducers({
  auth,
  parse,
  profile,
  board,
  pin,
  alert,
});
export default rootReducer;
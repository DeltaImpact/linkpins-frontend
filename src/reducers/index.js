import { combineReducers } from 'redux';

import account from './account.reducer';
import parse from './parse.reducer';
import board from './board.reducer';
import pin from './pin.reducer';
import { alert } from './alert.reducer';

// var myExports = require('./auth.reducer');
// console.log(Object.keys(myExports));


const rootReducer = combineReducers({
  account,
  parse,
  board,
  pin,
  alert,
});
export default rootReducer;
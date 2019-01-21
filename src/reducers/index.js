import { combineReducers } from 'redux';

import account from './account.reducer';
import parsing from './parse.reducer';
import board from './board.reducer';
import pin from './pin.reducer';
import chat from './chat.reducer';
import { alert } from './alert.reducer';

// var myExports = require('./auth.reducer');
// console.log(Object.keys(myExports));


const rootReducer = combineReducers({
  account,
  parsing,
  board,
  pin,
  alert,
  chat,
});
export default rootReducer;
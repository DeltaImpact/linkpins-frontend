import { combineReducers } from 'redux';

import auth from './auth.reducer';
import data from './data.reducer';
import board from './board.reducer';
import pin from './pin.reducer';
import { alert } from './alert.reducer';

// var myExports = require('./auth.reducer');
// console.log(Object.keys(myExports));


const rootReducer = combineReducers({
  auth,
  data,
  board,
  pin,
  alert,
});
export default rootReducer;
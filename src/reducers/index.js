import { combineReducers } from 'redux';

import auth from './auth.reducer';
import data from './data.reducer';
import { alert } from './alert.reducer';

// var myExports = require('./auth.reducer');
// console.log(Object.keys(myExports));
// debugger

const rootReducer = combineReducers({
  auth,
  data,
  alert
});
export default rootReducer;
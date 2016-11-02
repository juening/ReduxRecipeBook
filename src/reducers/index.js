import {combineReducers} from 'redux';
import recipes from './recipeReducer';
import categories from './categoryReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  recipes,
  categories,
  ajaxCallsInProgress
});

export default rootReducer;

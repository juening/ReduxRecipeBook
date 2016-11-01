import CategoryApi from '../api/mockCategoryApi';
import * as types from './actionTypes';

export function loadCategoriesSuccess(categories) {
  return {type: types.LOAD_CATEGORIES_SUCCESS, categories};
}

export function loadCategories() {
  return dispatch => {
    return CategoryApi.getAllCategories().then(categories => {
      dispatch(loadCategoriesSuccess(categories));
    }).catch(error => {
      throw(error);
    });
  };
}

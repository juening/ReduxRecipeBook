import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as recipeActions from '../actions/recipeActions';

describe('Store', function() {
  it('Should handle creating recipes', ()=>{
    const store = createStore(rootReducer, initialState);
    const recipe = {
      title: "Clean Code"
    };

    const action  = recipeActions.createRecipeSuccess(recipe);
    store.dispatch(action);

    //asert
    const actual = store.getState().recipes[0];
    const expected = {
      title: "Clean Code"
    };

    expect(actual).toEqual(expected);
  })
})

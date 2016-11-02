import expect from 'expect';
import * as recipeActions from './recipeActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Recipe Actions', ()=>{
  describe('createRecipeSuccess', ()=>{
    it('should create a CREATE_RECIPE_SUCCESS action', ()=>{
      const recipe = {id:'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_RECIPE_SUCCESS,
        recipe:recipe
      };

      const action = recipeActions.createRecipeSuccess(recipe);

      expect(action).toEqual(expectedAction);
    });
  });
});

//test thunk
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', ()=> {
  afterEach(()=> {
    nock.cleanAll();
  });

  it('should creat BEGIN_AJAX_CALL and LOAD_RECIPES_SUCCESS when loading recipes', (done) => {
    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_RECIPES_SUCCESS, body: {recipes: [{id:'clean-code', title: 'Clean Code'}]}}
    ];

  const store = mockStore({courses: []}, expectedActions);

  store.dispatch(recipeActions.loadRecipes()).then(()=>{
    const actions = store.getActions();
    expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
    expect(actions[1].type).toEqual(types.LOAD_RECIPES_SUCCESS);
    done();
    });
  });
});

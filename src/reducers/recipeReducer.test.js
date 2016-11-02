import expect from 'expect';
import recipeReducer from './recipeReducer';
import * as actions from '../actions/recipeActions';

describe('Recipe Recucer', ()=>{
  it('Should add recipe when passed CREATE_RECIPE_SUCCESS', ()=>{
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];

    const newRecipe = {title: 'C'};

    const action = actions.createRecipeSuccess(newRecipe);

    const newState = recipeReducer(initialState, action);

    //asert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('Should update recipe when passed UPDATE_RECIPE_SUCCESS', ()=> {
    const initialState = [
      {id: 'A',title: 'A'},
      {id: 'B',title: 'B'},
      {id: 'C',title: 'C'}
    ];

    const recipe = {id:'B', title: 'new title of B'};
    const action = actions.updateRecipeSuccess(recipe);

    const newState = recipeReducer(initialState, action);
    const updatedRecipe = newState.find(a => a.id == recipe.id);
    const untouchedRecipe = newState.find(a => a.id == 'A');

    //asert
    expect(updatedRecipe.title).toEqual('new title of B');
    expect(untouchedRecipe.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});

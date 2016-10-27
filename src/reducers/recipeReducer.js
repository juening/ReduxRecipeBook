export default function recipeReducer(state = [], action) {
  switch(action.type) {
    case 'CREATE_RECIPE':
      return [...state, Object.assign({}, action.recipe)];
      
    default:
      return state;
  }
}

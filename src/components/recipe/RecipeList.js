import React, {PropTypes, Component} from 'react';
import RecipeListRow from './RecipeListRow';

const RecipeList = ({recipes}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          
          <th>Title</th>
          <th>Category</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map(recipe => <RecipeListRow key={recipe.id} recipe={recipe} />)}
      </tbody>
    </table>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;

import React, {PropTypes}  from 'react';
import {Link} from 'react-router';

const RecipeListRow = ({recipe}) => {
  return (
    <tr>
      <td><Link to={'/recipe/' + recipe.id}>{recipe.title}</Link></td>
      <td>{recipe.category}</td>
      <td>{recipe.time}</td>
    </tr>
  );
};

RecipeListRow.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeListRow;

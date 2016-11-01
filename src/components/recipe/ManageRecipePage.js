import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';

class ManageRecipePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      recipe: Object.assign({}, props.recipe),
      errors: {}
    };
    this.updateRecipeState = this.updateRecipeState.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.recipe.id != nextProps.recipe.id) {
      this.setState({recipe: Object.assign({}, nextProps.recipe)});
    }
  }

  updateRecipeState(event) {
    const field = event.target.name;
    let recipe = this.state.recipe;
    recipe[field] = event.target.value;
    return this.setState({recipe:recipe});
  }

  saveRecipe(event) {
    event.preventDefault();
    this.props.actions.saveRecipe(this.state.recipe);
    this.context.router.push('/recipes');
  }

  render() {
    return (
      <RecipeForm
        recipe={this.state.recipe}
        allCategories={this.props.categories}
        errors={this.state.errors}
        onChange={this.updateRecipeState}
        onSave={this.saveRecipe}
      />
    );
  }
}

ManageRecipePage.propTypes = {
  recipe: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageRecipePage.contextTypes = {
  router: PropTypes.object
};

function getRecipeById(recipes, id) {
  const recipe = recipes.filter(recipe => recipe.id == id);
  if(recipe.length)
    return recipe[0];
  return null;
}

function mapStateToProps(state,ownProps){
  const recipeId = ownProps.params.id; //from the path '/course/:id'
  let recipe  = {id: "", title:"", category: "", time: ""};

  if(recipeId && state.recipes.length > 0) {
    recipe = getRecipeById(state.recipes, recipeId);
  }

  const categoriesFormattedForDropdown = state.categories.map(category => {
    return {
      value: category.id,
      text: category.name
    };
  });

  return {
    recipe:recipe,
    categories: categoriesFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);

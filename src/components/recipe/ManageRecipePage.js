import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import toastr from 'toastr';

class ManageRecipePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      recipe: Object.assign({}, props.recipe),
      errors: {},
      saving: false
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

  redirect(){
    this.setState({saving:false});
    toastr.success('Recipe saved!');
    this.context.router.push('/recipes');
  }

  saveRecipe(event) {
    event.preventDefault();
    this.setState({saving:true});
    this.props.actions.saveRecipe(this.state.recipe)
      .then(() => this.redirect())
      .catch(error=>{
        toastr.error(error);
        this.setState({saving:false});
      });
  }

  render() {
    return (
      <RecipeForm
        recipe={this.state.recipe}
        allCategories={this.props.categories}
        errors={this.state.errors}
        onChange={this.updateRecipeState}
        onSave={this.saveRecipe}
        saving={this.state.saving}
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
  const recipeId = ownProps.params.id; //from the path '/recipe/:id'
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

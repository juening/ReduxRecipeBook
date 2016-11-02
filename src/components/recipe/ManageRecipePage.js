import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeForm from './RecipeForm';
import toastr from 'toastr';
import {categoriesFormattedForDropdown} from '../../selectors/selectors';

export class ManageRecipePage extends Component {
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

  recipeFormIsValid(){
    let formIsValid = true;
    let errors = {};

    if(this.state.recipe.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveRecipe(event) {
    event.preventDefault();
    if(!this.recipeFormIsValid()){
      return;
    }
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



  return {
    recipe:recipe,
    categories: categoriesFormattedForDropdown(state.categories)
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);

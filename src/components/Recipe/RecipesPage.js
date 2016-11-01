import React, {Component, PropTypes} from 'react';
import {connect}  from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recipeActions from '../../actions/recipeActions';
import RecipeList from './RecipeList';
import {browserHistory} from 'react-router';

class RecipesPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddRecipePage = this.redirectToAddRecipePage.bind(this);
    // this.state = {
    //   recipe: {title: ''}
    // };
    // this.onTitleChange = this.onTitleChange.bind(this);
    // this.onClickSave = this.onClickSave.bind(this);
  }

  // onTitleChange(event){
  //   const recipe = this.state.recipe;
  //   recipe.title = event.target.value;
  //   this.setState({recipe: recipe});
  // }
  //
  // onClickSave(){
  //   this.props.actions.createRecipe(this.state.recipe);
  // }
  redirectToAddRecipePage(){
    browserHistory.push('/recipe');
  }

  recipeRow(recipe, index){
    return (<div key={index}>{recipe.title}</div>);
  }

  render() {
    const {recipes} = this.props;
    return (
      <div>
        <h1>Recipes</h1>
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddRecipePage} />

        <RecipeList recipes={recipes} />
        {/* {this.props.recipes.map(this.recipeRow)}
        <input type="text" onChange={this.onTitleChange} value={this.state.recipe.title} />
        <input type="submit" value="Save" onClick={this.onClickSave} /> */}
      </div>
    );
  }
}

RecipesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {

  return {
    recipes: state.recipes
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);

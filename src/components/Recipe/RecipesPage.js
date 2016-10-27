import React, {Component, PropTypes} from 'react';
import {connect}  from 'react-redux';
import * as recipeActions from '../../actions/recipeActions';

class RecipesPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      recipe: {title: ''}
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event){
    const recipe = this.state.recipe;
    recipe.title = event.target.value;
    this.setState({recipe: recipe});
  }

  onClickSave(){
    this.props.dispatch(recipeActions.createRecipe(this.state.recipe));
  }

  render() {
    return (
      <div>
        <h1>Recipes</h1>
        <input type="text" onChange={this.onTitleChange} value={this.state.recipe.title} />
        <input type="submit" value="Save" onClick={this.onClickSave} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    recipes: state.recipes
  };
}


export default connect(mapStateToProps)(RecipesPage);

import React, {Component, PropTypes} from 'react';

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
    alert(`Saving ${this.state.recipe.title}`);
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

export default RecipesPage;

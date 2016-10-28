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
  }

  render() {
    return (
      <RecipeForm
        recipe={this.state.recipe}
        allCategories={[]}
        errors={this.state.errors}
      />
    );
  }
}

ManageRecipePage.propTypes = {
  recipe: PropTypes.object.isRequired
};

function mapStateToProps(state,ownProps){
  let recipe  = {id: "", title:"", category: "", time: ""};
  return {recipe:recipe};
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(recipeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecipePage);

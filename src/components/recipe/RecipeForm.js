import React,{PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const RecipeForm = ({recipe, allCategories, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Manage Recipe</h1>
      <TextInput name="title" label="Title" value={recipe.title} onChange={onChange} error={errors.title} />
      <SelectInput name="category" label="Category" value={recipe.category} defaultOption="Select Category" options={allCategories} onChange={onChange} error={errors.category} />
      <TextInput name="time" label="Time" value={recipe.time} onChange={onChange} error={errors.time} />
      <input type="submit" disabled={saving} value={saving? 'Saving...' : 'Save'} className="btn btn-primary" onClick={onSave} />
    </form>
  );
};

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  allCategories:PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default RecipeForm;

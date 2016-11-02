import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import {ManageRecipePage} from './ManageRecipePage';

describe('Manage Recipe Page', ()=> {
  it('sets error msg when trying to save empty title', ()=>{
    const props = {
      categories:[],
      actions: {saveRecipe: ()=> {return Promise.resolve();}},
      recipe: {id: "", title:"", category: "", time: ""}
    };
    const wrapper = mount(<ManageRecipePage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});

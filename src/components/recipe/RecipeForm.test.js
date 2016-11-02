import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import RecipeForm from './RecipeForm';

function setup(saving) {
  const props = {
    recipe: {}, saving: saving, errors: {},
    onSave: ()=>{},
    onChange: ()=> {}
  };

  return shallow(<RecipeForm {...props} />);
}

it('renders form and h1', ()=> {
  const wrapper = setup(false);
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h1').text()).toEqual('Manage Recipe');
});

it('save button is labeled as "Save" when not saving', ()=>{
  const wrapper = setup(false);
  expect(wrapper.find('input').props().value).toBe('Save');
});

it('save button is labeled as "Saving" when saving', ()=>{
  const wrapper = setup(true);
  expect(wrapper.find('input').props().value).toBe('Saving');
});

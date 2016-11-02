import expect from 'expect';
import {categoriesFormattedForDropdown} from './selectors';

describe('Category Selectors', ()=> {
  describe('categoriesFormattedForDropdown', ()=> {
    it('should return categories formatted for use in a dropdown', ()=> {
      const categories = [ {
          id: 'noodle',
          name:'Noodle'
        },
        {
          id: 'pie',
          name: 'Pie'
        }];

        const expected = [  {
            value: 'noodle',
            text:'Noodle'
          },
          {
            value: 'pie',
            text: 'Pie'
          }];
          expect(categoriesFormattedForDropdown(categories)).toEqual(expected);
    });
  });
});

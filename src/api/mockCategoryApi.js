import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const categories = [
  {
    id: 'noodle',
    name:'Noodle'
  },
  {
    id: 'pie',
    name: 'Pie'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (category) => {
  return category.name.toLowerCase();
};

class CategoryApi {
  static getAllCategories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], categories));
      }, delay);
    });
  }

  static saveCategory(category) {
    category = Object.assign({}, category); // to avoid manipulating object passed in.
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate server-side validation
          const minCategoryNameLength = 3;
          if (category.name.length < minCategoryNameLength) {
            reject(`Name must be at least ${minCategoryNameLength} characters.`);
          }

          if (category.id) {
            const existingCategoryIndex = categories.findIndex(a => a.id == category.id);
            categories.splice(existingCategoryIndex, 1, category);
          } else {
            //Just simulating creation here.
            //The server would generate ids for new categories in a real app.
            //Cloning so copy returned is passed by value rather than by reference.
            category.id = generateId(category);
            categories.push(category);
          }

          resolve(category);
      }, delay);
    });
  }

  static deleteCategory(categoryId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCategoryToDelete = categories.findIndex(category => {
          category.categoryId == categoryId;
        });
        categories.splice(indexOfCategoryToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CategoryApi;

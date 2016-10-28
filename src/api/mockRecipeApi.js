import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const recipes = [
   {
      id:"Pumpkin-Pie",
      category: "Pie",
      ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"],
      title: "Pumpkin Pie",
      time: 25
  },
   {
      id: "Spaghetti",
      category: "Noodles",
      ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"],
      title: "Spaghetti",
      time: 15
  },
   {
      id: "Onion-Pie",
      category: "Pie",
      ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"],
      title: "Onion Pie",
      time: 30
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (recipe) => {
  return replaceAll(recipe.title, ' ', '-');
};

class RecipeApi {
  static getAllRecipes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], recipes));
      }, delay);
    });
  }

  static saveRecipe(recipe) {
    recipe = Object.assign({}, recipe); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minRecipeTitleLength = 1;
        if (recipe.title.length < minRecipeTitleLength) {
          reject(`Title must be at least ${minRecipeTitleLength} characters.`);
        }

        if (recipe.id) {
          const existingRecipeIndex = recipes.findIndex(a => a.id == recipe.id);
          recipes.splice(existingRecipeIndex, 1, recipe);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new recipes in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          recipe.id = generateId(recipe);
          //recipe.watchHref = `http://localhost:3000/recipes/${recipe.id}`;
          recipes.push(recipe);
        }

        resolve(recipe);
      }, delay);
    });
  }

  static deleteRecipe(recipeId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfRecipeToDelete = recipes.findIndex(recipe => {
          recipe.recipeId == recipeId;
        });
        recipes.splice(indexOfRecipeToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default RecipeApi;

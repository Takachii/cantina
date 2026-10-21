function togglePopout() {
    const menu = document.getElementById('popout-menu');
    menu.classList.toggle('hidden');
}

document.getElementById('popout-menu').addEventListener('click', function(event) {
    if (event.target === this) {
        togglePopout();
    }
});

// function renderRecipeCard(recipe) {
//     return `
//         <div class="p-4 rounded-md border" style="background-color: #1E293B; border-color: #334155;">
//             <h4 class="text-xl font-bold mb-2.5">${recipe.name}</h4>
//             <p class="text-gray-400"><strong class="text-white font-bold">Category: </strong>${recipe.category}</p>
//             <p class="text-gray-400"><strong class="text-white font-bold">Type: </strong>${recipe.type}</p>
//             <p class="text-gray-400"><strong class="text-white font-bold">Price: </strong>${recipe.price} DH</p>
//             <p class="text-gray-400"><strong class="text-white font-bold">Status: </strong>${recipe.status}</p>
//             <div class="flex justify-center-safe mt-4 gap-2">
//                 <button class="flex-7 bg-blue-400 hover:bg-blue-300 w-full rounded-md p-1 cursor-pointer">Edit</button>
//                 <button class="flex-3 bg-red-600 hover:bg-red-500 w-full rounded-md p-1 cursor-pointer">Delete</button>
//             </div>
//         </div>
//     `;
// }

// const container = document.getElementById('recipes-grid');

// const myNewRecipe = {
//     name: 'Test',
//     category: 'Test',
//     type: 'Vegetarian',
//     price: 5,
//     status: 'Available'
// };

// container.innerHTML += renderRecipeCard(myNewRecipe);
// container.innerHTML += renderRecipeCard(myNewRecipe);
// container.innerHTML += renderRecipeCard(myNewRecipe);
// container.innerHTML += renderRecipeCard(myNewRecipe);
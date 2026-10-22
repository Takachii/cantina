const recipts = [];
const reciptsDays = [];
const category = ["Bio", "Végétarien", "Classique"];

let reciptEditSelect;

function getReciptsObjectByID(id) {
    for (let i=0; i<recipts.length; i++) {
        if (recipts[i].id === id) return recipts[i];
    }
}

function deleteReciptsObjectByID(id) {
    for (let i=0; i<recipts.length; i++) {
        if (recipts[i].id === id) {
            recipts.splice(i, 1);
            return true
        }
    }
}

function togglePopout() {

    const menu = document.getElementById("popout-menu");
    menu.classList.toggle("hidden");

    document.getElementById("span-recipt-notification").classList.add("hidden");

    document.getElementById("btn-create-recipt").textContent = "Create Recipe Reserve";
    document.getElementById("input-recip-name").value = "";
    document.getElementById("input-recip-price").value = "";
    document.getElementById("select-recip-category").selectedIndex = 0;

}

function toggleDaysPopout() {
    
    const menu = document.getElementById("popout-days");
    menu.classList.toggle("hidden");

    const categoryList = document.getElementById("select-days-recip-category");
    for (let value of recipts) {
        if (value.status)
            categoryList.innerHTML += `<option id="${value.id}"> <strong>Name: </strong>${value.name} | <strong>Category:</strong> ${category[value.category]}</option>`;
    }

}

function renderRecipeCard(recipe) {
    return `
        <div id="${recipe.id}" class="card-wrapper p-4 rounded-md border" style="background-color: #1E293B; border-color: #334155;">
            <h4 class="text-xl font-bold mb-2.5">${recipe.name}</h4>
            <p class="text-gray-400"><strong class="text-white font-bold">Category: </strong>${category[recipe.category - 1]}</p>
            <p class="text-gray-400"><strong class="text-white font-bold">Price: </strong>${recipe.price} DH</p>
            <p class="text-gray-400"><strong class="text-white font-bold">Status: </strong>${recipe.status ? "Available" : "Already Selected"}</p>
            <div class="flex justify-center-safe mt-4 gap-2">
                <button class="btn-recipt-edit flex-7 bg-blue-400 hover:bg-blue-300 w-full rounded-md p-1 cursor-pointer">Edit</button>
                <button class="btn-recipt-delete flex-3 bg-red-600 hover:bg-red-500 w-full rounded-md p-1 cursor-pointer">Delete</button>
            </div>
        </div>
    `;
}

const button_create_recipt = document.getElementById("btn-create-recipt");

button_create_recipt.addEventListener("click", function(event) {

    event.preventDefault()

    const input_recipt_name = document.getElementById("input-recip-name");
    if (input_recipt_name.value.length < 3 || input_recipt_name.value.length > 30) {
        document.getElementById("span-recipt-notification").classList.remove("hidden");
        document.getElementById("span-recipt-notification").textContent = "Pelase enter valid name !";
        return false;
    }

    const input_recipt_price = document.getElementById("input-recip-price");
    if (Number(input_recipt_price.value) <= 0) {
        document.getElementById("span-recipt-notification").classList.remove("hidden");
        document.getElementById("span-recipt-notification").textContent = "Pelase enter valid price !";
        return false;
    }

    const select_recipt_category = document.getElementById("select-recip-category");
    if (select_recipt_category.selectedIndex === 0) {
        document.getElementById("span-recipt-notification").classList.remove("hidden");
        document.getElementById("span-recipt-notification").textContent = "Pelase select valid category !";
        return false;
    }

    if (button_create_recipt.textContent === "Update Recipe Reserve") {

        const recipesObject = getReciptsObjectByID(reciptEditSelect.id);

        recipesObject.name = String(input_recipt_name.value);
        recipesObject.price = Number(input_recipt_price.value);
        recipesObject.category = Number(select_recipt_category.selectedIndex);

        const container = document.getElementById("recipes-grid");
        container.innerHTML = renderRecipeCard(recipesObject);

    } else {

        const reciptCache = {
            id: crypto.randomUUID(),
            name: String(input_recipt_name.value),
            category: Number(select_recipt_category.selectedIndex),
            price: Number(input_recipt_price.value),
            status: true
        }

        recipts.push(reciptCache);

        const container = document.getElementById("recipes-grid");
        container.innerHTML += renderRecipeCard(reciptCache);

    }

    document.getElementById("popout-menu").classList.toggle("hidden");

});

const container_recipes = document.getElementById("recipes-grid");

container_recipes.addEventListener("click", function(event) {

    const card = event.target.closest(".card-wrapper");

    if (event.target.classList.contains("btn-recipt-edit")) {

        const menu = document.getElementById("popout-menu");
        menu.classList.toggle("hidden");

        document.getElementById("btn-create-recipt").textContent = "Update Recipe Reserve";

        const recipesObject = getReciptsObjectByID(card.id);
        document.getElementById("input-recip-name").value = recipesObject.name;
        document.getElementById("input-recip-price").value = recipesObject.price;
        document.getElementById("select-recip-category").selectedIndex = recipesObject.category;

        reciptEditSelect = card;

    } else if (event.target.classList.contains("btn-recipt-delete")) {
        deleteReciptsObjectByID(card.id)
        card.remove();
    }

});

const container_days = document.getElementById("container-days");
container_days.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-day]");
    if (!button) return false;

    toggleDaysPopout()

    // const day = button.dataset.day;
    // const meal = button.dataset.meal;

    // reciptsDays[day] = {};
    // reciptsDays[day][meal] = {};
    
    // reciptsDays[day][meal] = "Hello World";

    // console.log(days);

});

const button_selectDay_recipt = document.getElementById("btn-select-day-recipt");
button_selectDay_recipt.addEventListener("click", function(event) {

    event.preventDefault();

    const select_reciptDay = document.getElementById("select-days-recip-category");
    if (!select_reciptDay) return false;

})
const reciptsDays = [];
const reciptsItems = [];

const QUALITATIF_LIST = ["Bio", "Végétarien", "Classique"];
const CATEGORY_LIST = ["Entrée", "Plat Principal", "Dessert"]

let reciptEditSelect, reciptDaysSelect;

function getReciptsObjectByID(id) {
    for (let i=0; i<reciptsItems.length; i++) {
        if (reciptsItems[i].id === id) return reciptsItems[i];
    }
}

function deleteReciptsObjectByID(id) {
    for (let i=0; i<reciptsItems.length; i++) {
        if (reciptsItems[i].id === id) {
            reciptsItems.splice(i, 1);
            return true;
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
    document.getElementById("select-recip-qualitatif").selectedIndex = 0;
    document.getElementById("select-recip-category").selectedIndex = 0;

}

function toggleDaysPopout(categoryID) {
    
    const menu = document.getElementById("popout-days");
    menu.classList.toggle("hidden");

    if (!categoryID) return false;

    const qualitatifList = document.getElementById("select-days-recip-qualitatif");
    qualitatifList.innerHTML = ``

    let count = 0;
    for (let value of reciptsItems) {
        if (value.status && value.category == categoryID) {
            qualitatifList.innerHTML += `<option id="${value.id}"> <strong>Name: </strong>${value.name} | <strong>Qualitatif:</strong> ${QUALITATIF_LIST[value.qualitatif - 1]} | <strong>${value.price} DH</strong></option>`;
            count++
        }
    }

    if (count===0) qualitatifList.innerHTML += `<option>Please craete recipts first !</option>`;

}

function renderRecipeCard(recipe) {
    return `
    <div id="${recipe.id}" class="card-wrapper p-4 rounded-md border border-slate-700 bg-slate-800">
        <h4 class="text-xl font-bold mb-2.5">${recipe.name}</h4>
            <p class="text-gray-400"><strong class="text-white font-bold">Qualitatif: </strong>${QUALITATIF_LIST[recipe.qualitatif - 1]}</p>
            <p class="text-gray-400"><strong class="text-white font-bold">Category: </strong>${CATEGORY_LIST[recipe.category - 1]}</p>
            <p class="text-gray-400"><strong class="text-white font-bold">Price: </strong>${recipe.price} DH</p>
            <p class="text-gray-400"><strong class="text-white font-bold">Status: </strong>${recipe.status ? "Available" : "Already Selected"}</p>
            <div class="flex justify-center-safe mt-4 gap-2">
                <button class="btn-recipt-edit flex-7 bg-blue-400 hover:bg-blue-300 w-full rounded-md p-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none">Edit</button>
                <button class="btn-recipt-delete flex-3 bg-red-600 hover:bg-red-500 w-full rounded-md p-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none">Delete</button>
            </div>
        </div>
    `;
}

function renderRecipeCardEdited(recipe) {
    return `
        <h4 class="text-xl font-bold mb-2.5">${recipe.name}</h4>
        <p class="text-gray-400"><strong class="text-white font-bold">Qualitatif: </strong>${QUALITATIF_LIST[recipe.qualitatif - 1]}</p>
        <p class="text-gray-400"><strong class="text-white font-bold">Category: </strong>${CATEGORY_LIST[recipe.category - 1]}</p>
        <p class="text-gray-400"><strong class="text-white font-bold">Price: </strong>${recipe.price} DH</p>
        <p class="text-gray-400"><strong class="text-white font-bold">Status: </strong>${recipe.status ? "Available" : "Already Selected"}</p>
        <div class="flex justify-center-safe mt-4 gap-2">
            <button class="btn-recipt-edit flex-7 bg-blue-400 hover:bg-blue-300 w-full rounded-md p-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none">Edit</button>
            <button class="btn-recipt-delete flex-3 bg-red-600 hover:bg-red-500 w-full rounded-md p-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none">Delete</button>
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

    const select_recipt_qualitatif = document.getElementById("select-recip-qualitatif");
    if (select_recipt_qualitatif.selectedIndex === 0) {
        document.getElementById("span-recipt-notification").classList.remove("hidden");
        document.getElementById("span-recipt-notification").textContent = "Pelase select valid qualitatif !";
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
        recipesObject.qualitatif = Number(select_recipt_qualitatif.selectedIndex);
        recipesObject.category = Number(select_recipt_category.selectedIndex);

        const container = document.getElementById(reciptEditSelect.id);
        container.innerHTML = renderRecipeCardEdited(recipesObject);

    } else {

        const reciptCache = {
            id: crypto.randomUUID(),
            name: String(input_recipt_name.value),
            qualitatif: Number(select_recipt_qualitatif.selectedIndex),
            category: Number(select_recipt_category.selectedIndex),
            price: Number(input_recipt_price.value),
            status: true
        }

        reciptsItems.push(reciptCache);

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
        document.getElementById("select-recip-qualitatif").selectedIndex = recipesObject.qualitatif;
        document.getElementById("select-recip-category").selectedIndex = recipesObject.category;

        reciptEditSelect = card;

    } else if (event.target.classList.contains("btn-recipt-delete")) {
        deleteReciptsObjectByID(card.id)
        card.remove();
    }

});

let activeDay = null;
let activeCategory = null;
let activeSelectedElement = null;

const container_days = document.getElementById("container-days");
container_days.addEventListener("click", function(event) {
    
    const selectButton = event.target.closest("button");
    if (!selectButton) return;

    const container_recipt_days = selectButton.closest("[data-day]");
    if (!container_recipt_days) return;

    activeDay = container_recipt_days.dataset.day;
    activeCategory = Number(container_recipt_days.dataset.category);
    activeSelectedElement = selectButton;

    toggleDaysPopout(activeCategory + 1);

});

const button_selectDay_recipt = document.getElementById("btn-select-day-recipt");
button_selectDay_recipt.addEventListener("click", function(event) {
    
    event.preventDefault();

    const select_reciptDay = document.getElementById("select-days-recip-qualitatif");
    if (!select_reciptDay) return false;

    const reciptID = select_reciptDay.options[select_reciptDay.selectedIndex].id;
    const reciptObject = getReciptsObjectByID(reciptID);

    if (!reciptObject) return false;

    reciptsDays.push({
        id: crypto.randomUUID(),
        reciptID: reciptID,
        day: activeDay,
        category: activeCategory,
        qualitatif: reciptObject.qualitatif
    });

    document.querySelectorAll("[data-day]").forEach(card => {

        if (card.dataset.day === activeDay && Number(card.dataset.category) === activeCategory) {

            const name = card.querySelector("p.font-medium");
            const qualitatif = card.querySelector("p.text-slate-400");
            const price = card.querySelector("p.text-green-600");

            if (name) name.textContent = reciptObject.name;
            if (qualitatif) qualitatif.textContent = QUALITATIF_LIST[reciptObject.qualitatif];
            if (price) price.textContent = `${reciptObject.price} DH`;

            setReciptStatus(reciptObject, false);
            
            activeSelectedElement.textContent = "Remove";

            activeSelectedElement.classList.remove("bg-blue-400");
            activeSelectedElement.classList.remove("hover:bg-blue-300");
    
            activeSelectedElement.classList.add("bg-red-600");
            activeSelectedElement.classList.add("hover:bg-red-500");

            toggleDaysPopout();

        }
    });

    activeDay = null;
    activeCategory = null;
    activeSelectedElement = null;

});

function setReciptStatus(reciptObject, status) {

    if (!reciptObject) return false;

    reciptObject.status = status;

    const container_recipt = document.getElementById(reciptObject.id);
    container_recipt.classList.remove(status ? "bg-mist-900" : "bg-slate-800");
    container_recipt.classList.add(status ? "bg-slate-900" : "bg-mist-800");

    const buttons = container_recipt.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = !status;
    });

}
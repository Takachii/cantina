const reciptsDays = [];
const reciptsItems = [];

const QUALITATIF_LIST = ["Bio", "Végétarien", "Classique"];
const CATEGORY_LIST = ["Entrée", "Plat Principal", "Dessert"]

let reciptEditSelect;

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

    document.getElementById("span-days-recipt-notification").classList.add("hidden");

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

function getCategoryStyle(category) {
    if (category === "Entrée") {
        return {
            border: "border-t-2 border-t-sky-500/80 border-zinc-800",
            badge: "bg-sky-500/15 text-sky-400 border-sky-500/20"
        };
    } else if (category === "Plat Principal") {
        return {
            border: "border-t-2 border-t-amber-500/80 border-zinc-800",
            badge: "bg-amber-500/15 text-amber-400 border border-amber-500/20"
        };
    } else if (category === "Dessert") {
        return {
            border: "border-t-2 border-t-purple-500 border-zinc-800",
            badge: "bg-purple-500/15 text-purple-400 border-purple-500/20"
        };
    }
}

function renderRecipeCard(recipe) {

    const category = CATEGORY_LIST[recipe.category - 1];
    const style = getCategoryStyle(category);

    return `
        <div id="${recipe.id}" class="card-wrapper p-4 rounded-xl border ${style.border} bg-zinc-900/90 shadow-lg transition-all duration-200 flex flex-col justify-between">
            ${renderRecipeCardContent(recipe)}
        </div>
    `;
}

function renderRecipeCardContent(recipe) {
    
    const qualitatif = QUALITATIF_LIST[recipe.qualitatif - 1];
    const category = CATEGORY_LIST[recipe.category - 1];
    const style = getCategoryStyle(category);

    return `

        <div class="${recipe.day ? "" : "hidden"} flex justify-center mb-4">
            <p class="rounded-md border-b ${category === "Entrée" ? "border-sky-500" : category === "Plat Principal" ? "border-amber-500" : "border-purple-500"} text-white font-bold">Assigné: ${ recipe.day || "(Not Found)" }</p>
        </div>

        <div>
            <div class="flex items-start justify-between gap-2 mb-2">
                <h4 class="text-lg font-bold text-white leading-tight">${recipe.name}</h4>
                <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 whitespace-nowrap">
                    ${recipe.price} DH
                </span>
            </div>
            
            <div class="space-y-1.5 mt-3 text-xs">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold px-2 py-0.5 rounded border ${style.badge}">
                        ${category}
                    </span>
                    <span class="text-zinc-400 font-medium">${qualitatif}</span>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/80">
            <button class="btn-recipt-edit flex-1 text-xs font-semibold py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
                Edit
            </button>
            <button class="btn-recipt-delete flex-1 text-xs font-semibold py-1.5 rounded-lg bg-red-800/80 hover:bg-red-800 text-white border border-red-700/50 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
                Delete
            </button>
        </div>
    `;
}

function getReciptsObjectByID(id) {
    for (let i=0; i<reciptsItems.length; i++) {
        if (reciptsItems[i].id === id) return reciptsItems[i];
    }
}

function removeReciptsObjectByID(id) {
    for (let i=0; i<reciptsItems.length; i++) {
        if (reciptsItems[i].id === id) {
            reciptsItems.splice(i, 1);
            return true;
        }
    }
}

function getReciptsDaysObjectByID(id) {
    for (let i=0; i<reciptsDays.length; i++) {
        if (reciptsDays[i].id === id) return reciptsDays[i];
    }
}

function removeReciptsDaysByID(id) {
    for (let i=0; i<reciptsDays.length; i++) {
        if (reciptsDays[i].id === id) {
            reciptsDays.splice(i, 1);
            return true;
        }
    }
}

function getTotalDayPrice(day) {

    let total = 0;

    for (const value of reciptsDays) {
        const reciptObject = getReciptsObjectByID(value.reciptID);
        if (reciptObject)
            if (value.day === day) total += reciptObject.price;
    }

    return total;

}

function getVegetarianStatus() {
    for (const value of reciptsDays) 
        if (value.qualitatif === 2) return true;
}

function getTotalDaysReady() {

    const dayCounts = {};
    let totalResult = 0;

    for (const recipe of reciptsItems) {
        if (recipe.day) {
            dayCounts[recipe.day] = (dayCounts[recipe.day] || 0) + 1;
        }
    }

    for (const day in dayCounts) {
        if (dayCounts[day] === 3) {
            totalResult++;
        }
    }

    return totalResult;

}

function updateDashboard() {

    const dash_total_recipts = document.getElementById("dash-total-recipts");
    dash_total_recipts.textContent = `Total Recipes: ${reciptsItems.length}`;
    
    const dash_days_ready = document.getElementById("dash-days-ready");
    dash_days_ready.textContent = `Days Ready: ${getTotalDaysReady()}/5`

    // const dash_weekly_average = document.getElementById("dash-weekly-average");

    const span_vegetarian = document.getElementById("span-vegetarian-status");
    if (span_vegetarian) {
        const status = getVegetarianStatus();
        span_vegetarian.className = status ? "bg-emerald-950 text-white border border-emerald-600/60 inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full shadow-sm" : "bg-red-950 text-white border border-red-600/60 inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
        span_vegetarian.textContent = status ? "Vegetarian Dish (ACTIVE)" : "Vegetarian Dish (Not Selected)"
    }

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
    if (isNaN(Number(input_recipt_price.value)) || Number(input_recipt_price.value) <= 0) {
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

        const category = CATEGORY_LIST[recipesObject.category - 1];
        const style = getCategoryStyle(category);

        const container = document.getElementById(reciptEditSelect.id);
        container.className = `card-wrapper p-4 rounded-xl border ${style.border} bg-zinc-900/90 shadow-lg transition-all duration-200 flex flex-col justify-between`;
        container.innerHTML = renderRecipeCardContent(recipesObject);

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

        updateDashboard();

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
        removeReciptsObjectByID(card.id)
        card.remove();
        updateDashboard();
    }

});

let activeDay = null;
let activeCategory = null;
let activeButtonSelected = null;

const container_days = document.getElementById("container-days");
container_days.addEventListener("click", function(event) {
    
    const selectButton = event.target.closest("button");
    if (!selectButton) return;

    const container_recipt_days = selectButton.closest("[data-day]");
    if (!container_recipt_days) return;

    activeDay = container_recipt_days.dataset.day;
    activeCategory = Number(container_recipt_days.dataset.category);
    activeButtonSelected = selectButton;

    if (selectButton.textContent === "Remove") {

        const reciptDayObject = getReciptsDaysObjectByID(selectButton.id)
        if (!reciptDayObject) return false;
        
        const reciptObject = getReciptsObjectByID(reciptDayObject.reciptID);
        if (!reciptObject) return false;

        removeReciptsDaysByID(selectButton.id);

        reciptObject.status = true;

        const container_recipt = document.getElementById(reciptDayObject.reciptID)
        if (!container_recipt) return false;

        setReciptStatus(reciptObject, true)

        selectButton.id = null;
        selectButton.textContent = "Select";
        
        selectButton.classList.remove("bg-red-600");
        selectButton.classList.remove("hover:bg-red-500");
        selectButton.classList.add("bg-blue-400");
        selectButton.classList.add("hover:bg-blue-300");

        const name = container_recipt_days.querySelector(".cont-days-name");
        const qualitatif = container_recipt_days.querySelector(".cont-days-qualitatif");
        const price = container_recipt_days.querySelector(".cont-days-category");

        if (name) name.textContent = "Empty";
        if (qualitatif) qualitatif.textContent = "Empty";
        if (price) price.textContent = `0 DH`;
        
        document.querySelectorAll("[data-totalprice]").forEach(cardTotalPrice => {
            if (cardTotalPrice.dataset.totalprice === activeDay) {
                cardTotalPrice.textContent = `Total Price : ${getTotalDayPrice(activeDay)} DH`;
            }
        });

        reciptObject.day = null;

        const category = CATEGORY_LIST[activeCategory];
        const style = getCategoryStyle(category);
        container_recipt.className = `card-wrapper p-4 rounded-xl border ${style.border} bg-zinc-900/90 shadow-lg transition-all duration-200 flex flex-col justify-between`;
        container_recipt.innerHTML = renderRecipeCardContent(reciptObject);

        updateDashboard();

        return true;

    }

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

    if (getTotalDayPrice(activeDay) + reciptObject.price > 50) {
        document.getElementById("span-days-recipt-notification").classList.remove("hidden");
        document.getElementById("span-days-recipt-notification").textContent = "You have exceeded the daily limit 50 DH";
        return false;
    }

    const generatedID = crypto.randomUUID();
    reciptsDays.push({
        id: generatedID,
        reciptID: reciptID,
        day: activeDay,
        category: activeCategory,
        qualitatif: reciptObject.qualitatif
    });

    reciptObject.day = activeDay;

    const category = CATEGORY_LIST[activeCategory];
    const style = getCategoryStyle(category);

    const container_recipt = document.getElementById(reciptID);
    container_recipt.className = `card-wrapper p-4 rounded-xl border ${style.border} bg-zinc-900/90 shadow-lg transition-all duration-200 flex flex-col justify-between`;
    container_recipt.innerHTML = renderRecipeCardContent(reciptObject);

    document.querySelectorAll("[data-day]").forEach(card => {
        if (card.dataset.day === activeDay && Number(card.dataset.category) === activeCategory) {

            document.querySelectorAll("[data-totalprice]").forEach(cardTotalPrice => {
                if (cardTotalPrice.dataset.totalprice === activeDay) {
                    cardTotalPrice.textContent = `Total Price : ${getTotalDayPrice(activeDay)} DH`;
                }
            });

            const name = card.querySelector(".cont-days-name");
            const qualitatif = card.querySelector(".cont-days-qualitatif");
            const price = card.querySelector(".cont-days-category");

            if (name) name.textContent = reciptObject.name;
            if (qualitatif) qualitatif.textContent = QUALITATIF_LIST[reciptObject.qualitatif - 1];
            if (price) price.textContent = `${reciptObject.price} DH`;

            setReciptStatus(reciptObject, false);

            activeButtonSelected.textContent = "Remove";

            activeButtonSelected.classList.remove("bg-blue-400");
            activeButtonSelected.classList.remove("hover:bg-blue-300");
            activeButtonSelected.classList.add("bg-red-600");
            activeButtonSelected.classList.add("hover:bg-red-500");

            activeButtonSelected.id = generatedID;

            toggleDaysPopout();
            updateDashboard();

        }
    });

    activeDay = null;
    activeCategory = null;
    activeButtonSelected = null;

});

function setReciptStatus(reciptObject, status) {

    if (!reciptObject) return false;

    reciptObject.status = status;

    const container_recipt = document.getElementById(reciptObject.id);
    const buttons = container_recipt.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = !status;
    });

}

updateDashboard();
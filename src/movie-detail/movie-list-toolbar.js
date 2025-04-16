import { createDivElementWithClass } from "../util/dom";    


export function createMovieListToolbar() {
    const wrapper = createDivElementWithClass(["movie-toolbar-wrapper"]);
    const container = createDivElementWithClass(["container"]);
    const flexDiv = createDivElementWithClass(["d-flex", "justify-content-between"]);
    
    flexDiv.appendChild(createButtonsWrapper());
    flexDiv.appendChild(createSelectMovieTypeElement());

    container.appendChild(flexDiv);
    wrapper.appendChild(container);

    return wrapper;
}

// Funcion para crear los botones del wrapper
function createButtonsWrapper() {
    const buttonsWrapper = createDivElementWithClass(["d-flex"]);
    buttonsWrapper.appendChild(createIconGridElement());
    buttonsWrapper.appendChild(createIconListElement());
    return buttonsWrapper;
}

// Crear el elemento icono grid (Boton)
function createIconGridElement() {
    const iconGrid = document.createElement("button");
    iconGrid.setAttribute("id", "movie-grid");
    iconGrid.setAttribute("type", "button");
    iconGrid.classList.add("btn", "btn-icon");

    const img = document.createElement("img");
    img.setAttribute("src", "grid-layout.svg");
    img.setAttribute("id", "movie-grid")

    iconGrid.appendChild(img);

    return iconGrid
}

// Crear el elemento icono list (Boton)
function createIconListElement() {
    const iconGrid = document.createElement("button");
    iconGrid.setAttribute("id", "movie-list");
    iconGrid.setAttribute("type", "button");
    iconGrid.classList.add("btn", "btn-icon");
    
    const img = document.createElement("img");
    img.setAttribute("src", "list-layout.svg");
    img.setAttribute("id", "movie-list")
    
    iconGrid.appendChild(img);
    
    return iconGrid
}
    

// Crear el elemento select movie type list (Boton)
function createSelectMovieTypeElement() {
    const select = document.createElement("select")
    select.setAttribute("id", "movie-type-select");
    select.setAttribute("aria-label", "Movie list type");
    select.classList.add("form-select",  "movie-select-auto-width");

    const options = [  
        ["now_Playing", "En Cartelera" ],
        ["Popular",  "Popular" ],
        ["top_Rated",  "Mejor Valoradas" ],
        ["upcoming",  "Próximamente" ],
        
    ];
    options.forEach(([value, text], index) => {
        const option = createOptionsElement(value, text);

        if (index === 0) {
            option.setAttribute("selected", true);
        }

        select.appendChild(option);
    });

    return select
}

// Crear las opciones del boton select
function createOptionsElement(value, text) {
    const option = document.createElement("option")
    option.setAttribute("value", value);
    option.textContent = text;
    return option
}
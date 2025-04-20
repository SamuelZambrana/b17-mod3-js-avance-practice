import { createDivElementWithClass } from "../util/dom";    


export function createMovieListToolbar() {
    // Crear el contenedor principal de la barra de herramientas
    const wrapper = createDivElementWithClass(["movie-toolbar-wrapper"]);
    const container = createDivElementWithClass(["container"]);
    const flexDiv = createDivElementWithClass(["d-flex", "justify-content-between"]);

    // Crear los elementos de la barra de herramientas
    const backButton = createBackButton();
    const buttonsWrapper = createButtonsWrapper();
    const selectMovieTypeElement = createSelectMovieTypeElement();

    // Configurar la visibilidad inicial de los elementos
    if (backButton) {
        backButton.style.display = 'none'; // El botón de retroceso estará oculto inicialmente
    }

    if (buttonsWrapper) {
        buttonsWrapper.style.display = 'block'; // Mostrar los botones de tipo de vista
    }

    if (selectMovieTypeElement) {
        selectMovieTypeElement.style.display = 'block'; // Mostrar el selector de tipo de películas
    }

    // Añadir los elementos al contenedor flex
    flexDiv.appendChild(buttonsWrapper);
    flexDiv.appendChild(selectMovieTypeElement);
    flexDiv.appendChild(backButton);

    // Agregar el contenedor flex al contenedor principal
    container.appendChild(flexDiv);
    wrapper.appendChild(container);

    return wrapper; // Retornar el contenedor principal de la barra de herramientas
}

// Función para crear el botón de retroceso
function createBackButton() {
    try {
        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'back-button';
        button.className = 'btn btn-icon';
        button.innerHTML = `<img src="arrow-big-left-line.svg" alt="Regresar" style="width: 48px; height: 48px;">`;
       
        return button;
    } catch (error) {
        console.error('Error al crear el botón "Back":', error);
        return null;
    }
}


// Funcion para crear los botones del wrapper
function createButtonsWrapper() {
    const buttonsWrapper = createDivElementWithClass(["view-type-select"]);
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
        ["top_Rated",  "Mejor Valoradas" ],
        ["upcoming",  "Próximamente" ],
        ["Popular",  "Popular" ],   
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
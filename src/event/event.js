import { createMoviesContainerElement } from '../movie-list/movie-list.js'; 
import { getAppElem , listViewElem, gridViewElem, getMoviesListContainerElem, movieTypeSelectElem} from '../util/dom.js'; 
import { movieViewTypes, state } from '../api/apiConfig.js'; 


export function setupViewButtons(movieListArray) {
    const gridButton = gridViewElem(); // Obtener el botón de vista grid
    const listButton = listViewElem(); // Obtener el botón de vista list

    if (!gridButton || !listButton) {
        console.error('No se encontraron los botones de vista.');
        return;
    }

    // Función interna para actualizar la vista
    const updateMoviesView = (viewType) => {
        const appElement = getAppElem(); // Contenedor principal
        const moviesContainer = getMoviesListContainerElem(); // Contenedor de películas

        // Eliminar el contenedor de películas si existe
        if (moviesContainer) {
            moviesContainer.remove();
        }

        // Crear nuevo contenedor de películas según la vista seleccionada
        const moviesContainerElement = createMoviesContainerElement(movieListArray, viewType);
        appElement.appendChild(moviesContainerElement);

        console.log(`Vista cambiada a "${viewType}".`);
    };

    // Eventos para los botones
    gridButton.addEventListener('click', () => {
        try {
            updateMoviesView(movieViewTypes.Grid); // Actualizar vista al modo grid

            // Cambiar estado activo de los botones
            gridButton.classList.add('active'); // Activar botón de vista grid
            listButton.classList.remove('active'); // Desactivar botón de vista list
        } catch (error) {
            console.error('Error al cambiar a la vista "grid":', error);
        }
    });

    listButton.addEventListener('click', () => {
        try {
            updateMoviesView(movieViewTypes.List); // Actualizar vista al modo list

            // Cambiar estado activo de los botones
            listButton.classList.add('active'); // Activar botón de vista list
            gridButton.classList.remove('active'); // Desactivar botón de vista grid
        } catch (error) {
            console.error('Error al cambiar a la vista "list":', error);
        }
    });
}

export function setupMovieTypeSelect(movieListCallback) {
    const movieTypeSelect = document.getElementById("movie-type-select"); // Obtener el elemento select por ID

    if (!movieTypeSelect) {
        console.error("No se encontró el elemento select de tipos de películas.");
        return;
    }

    // Agregar evento para manejar cambios en el select
    movieTypeSelect.addEventListener("change", async () => {
        try {
            const selectedType = movieTypeSelect.value; // Obtener el valor seleccionado
            console.log(`Tipo de película seleccionado: ${selectedType}`);

            // Llamar al callback para obtener los datos de las películas según el tipo seleccionado
            const movieListArray = await movieListCallback(selectedType);

            if (!movieListArray || movieListArray.length === 0) {
                console.warn("No se encontraron películas para el tipo seleccionado.");
                return;
            }

            // Recuperar el contenedor principal
            const appElement = getAppElem();

            // Eliminar el contenedor de películas existente, si lo hay
            const moviesContainer = document.getElementById("movies-list-container");
            if (moviesContainer) {
                moviesContainer.remove(); // Eliminar el contenedor existente
            }

            // Crear y añadir el nuevo contenedor de películas
            const moviesContainerElement = createMoviesContainerElement(movieListArray, movieViewTypes.Grid); // Vista predeterminada (grid)
            appElement.appendChild(moviesContainerElement);

            console.log("Películas actualizadas según el tipo seleccionado.");
        } catch (error) {
            console.error("Error al cambiar el tipo de películas:", error);
        }
});

}

/*
addMovieGridLayoutClickListener
addMovieListLayoutClickListener
addMovieTypeSelectChangeListener
*/
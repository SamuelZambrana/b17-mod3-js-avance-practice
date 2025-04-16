import { createMoviesContainerElement } from '../movie-list/movie-list.js'; 
import { getAppElem , listViewElem, gridViewElem} from '../util/dom.js'; 
import { movieViewTypes, state } from '../api/apiConfig.js'; 
import { createMovieListToolbar } from '../movie-detail/movie-list-toolbar.js';

export function setupListViewButton(movieListArray) {
    const listButton = listViewElem(); // Obtener el botón de vista list

    if (!listButton) {
        console.error('No se encontró el botón de vista list');
        return;
    }

    listButton.addEventListener('click', () => {
        try {
            const appElement = getAppElem(); // Contenedor principal

            // Función interna para actualizar la vista
            const updateMoviesView = (viewType) => {
                const moviesContainer = document.getElementById('movies-list-container'); // Contenedor de películas
                if (moviesContainer) {
                    moviesContainer.remove();
                }

                const moviesContainerElement = createMoviesContainerElement(movieListArray, viewType);
                appElement.appendChild(moviesContainerElement);

                console.log(`Vista cambiada a "${viewType}".`);
            };

            // Llamar a la función interna para la vista list
            updateMoviesView(movieViewTypes.List);
        } catch (error) {
            console.error('Error al cambiar a la vista "list":', error);
        }
    });
}

export function setupGridViewButton(movieListArray) {
    const gridButton = gridViewElem(); // Obtener el botón de vista grid

    if (!gridButton) {
        console.error('No se encontró el botón de vista grid');
        return;
    }

    gridButton.addEventListener('click', () => {
        try {
            const appElement = getAppElem(); // Contenedor principal

            // Función interna para actualizar la vista
            const updateMoviesView = (viewType) => {
                const moviesContainer = document.getElementById('movies-list-container'); // Contenedor de películas
                if (moviesContainer) {
                    moviesContainer.remove();
                }

                const moviesContainerElement = createMoviesContainerElement(movieListArray, viewType);
                appElement.appendChild(moviesContainerElement);

                console.log(`Vista cambiada a "${viewType}".`);
            };

            // Llamar a la función interna para la vista grid
            updateMoviesView(movieViewTypes.Grid);
        } catch (error) {
            console.error('Error al cambiar a la vista "grid":', error);
        }
    });
}


/*
addMovieGridLayoutClickListener
addMovieListLayoutClickListener
addMovieTypeSelectChangeListener
*/
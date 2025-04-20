import { createMoviesContainerElement } from '../movie-list/movie-list.js'; 
import { getAppElem , listViewElem, gridViewElem, getMoviesListContainerElem, movieTypeSelectElem} from '../util/dom.js'; 
import { movieViewTypes, state, selectOptions, movieListType} from '../api/apiConfig.js'; 
import { getMovieListData, getMovieDetailsData} from '../api/api.js';
import { createMovieDetailsPage} from '../movie-detail/movie-details.js'
import { createMovieListToolbar } from '../movie-detail/movie-list-toolbar.js';


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


export function setupMovieTypeChangeEvent(selectElementId) {
    try {
        const movieTypeSelect = document.getElementById(selectElementId);
        if (!movieTypeSelect) {
            throw new Error(`No se encontró el elemento select con ID: ${selectElementId}`);
        }

        movieTypeSelect.addEventListener('change', async (event) => {
            const selectedType = event.target.value;
            console.log('Valor recibido desde el evento change:', selectedType);

            // Normalizar el valor recibido
            const normalizedSelectedType = selectedType.toLowerCase();

            // Validar el tipo seleccionado
            if (!Object.values(movieListType).includes(normalizedSelectedType)) {
                console.error(`Tipo de película no válido: ${normalizedSelectedType}`);
                return;
            }

            try {
                console.log(`Lanzando consulta para el tipo de película: ${normalizedSelectedType}`);
                const updatedList = await updateMovieType(normalizedSelectedType);
                console.log(`Películas actualizadas para el tipo "${normalizedSelectedType}":`, updatedList);
            } catch (error) {
                console.error(`Error al actualizar las películas para el tipo "${normalizedSelectedType}":`, error);
            }
        });

        console.log(`Evento de cambio configurado para el elemento select con ID: ${selectElementId}`);
    } catch (error) {
        console.error('Error al configurar el evento de cambio de tipo de película:', error);
    }
}


export function setupMovieDetailsEvent() {
    try {
        // Obtener el contenedor principal donde están las películas
        const moviesContainer = getMoviesListContainerElem(); // Seleccionar contenedor

        if (!moviesContainer) {
            console.error('No se encontró el contenedor de la lista de películas.');
            return;
        }

        // Agregar un evento de clic al contenedor principal
        moviesContainer.addEventListener('click', async (event) => {
            const clickedElement = event.target;

            // Buscar el contenedor de la película en el que se hizo clic
            const movieContainer = clickedElement.closest('.movie-poster'); // Cambiar según tu clase específica
            if (!movieContainer) {
                console.warn('El clic no se realizó sobre un contenedor válido de película.');
                return;
            }

            // Obtener el ID de la película desde un atributo personalizado
            const movieId = movieContainer.getAttribute('data-movie-id');
            if (!movieId) {
                console.error('No se encontró el atributo "data-movie-id" en el contenedor.');
                return;
            }

            try {
                // Actualizar el estado a la página 2
                state.page = 2;
                console.log(`Navegando a la página ${state.page}: Detalles de la película.`);
                
                 //Recuperamos la vista de la bararra de herramientas
                createMovieListToolbar()
               
                // Actualizar la visibilidad de la barra de herramientas
                updateToolbarVisibility();

                // Obtener los datos de la película
                const movieData = await getMovieDetailsData(movieId);

                // Crear la página de detalles de la película
                const movieDetailsContainer = createMovieDetailsPage(movieData);

            } catch (error) {
                console.error(`Error al obtener los detalles de la película con ID "${movieId}":`, error);
            }
        });

        console.log('Evento de detalles de película configurado correctamente.');
    } catch (error) {
        console.error('Error al configurar el evento de detalles de película:', error);
    }
}

// Función para el evento de retroceso
export function setupBackButtonEvent() {
    try {
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.history.back(); // Regresar a la página anterior
            });
            console.log('Evento de retroceso agregado correctamente.');
        } else {
            console.error('El botón "Back" no existe en el DOM.');
        }
    } catch (error) {
        console.error('Error al añadir el evento de retroceso:', error);
    }
}


function updateToolbarVisibility() {
    // Seleccionar los elementos de la barra de herramientas
    const buttonsWrapper = document.querySelector('.view-type-select'); // Modos de vista
    const selectMovieTypeElement = document.getElementById('movie-type-select'); // Selector de tipo de películas
    const backButton = document.getElementById('back-button'); // Botón de retroceso

    // Validar que los elementos existan antes de aplicar los cambios
    if (buttonsWrapper) {
        buttonsWrapper.style.display = 'none'; // Ocultar modos de vista
    }
    if (selectMovieTypeElement) {
        selectMovieTypeElement.style.display = 'none'; // Ocultar selector de tipos de películas
    }
    if (backButton) {
        backButton.style.display = 'block'; // Mostrar el botón de retroceso
    }
}

async function updateMovieType(newMovieType) {
    try {
        // Validar que el tipo de película proporcionado sea válido
        if (!Object.values(movieListType).includes(newMovieType)) {
            throw new Error(`Tipo de película inválido: ${newMovieType}`);
        }

        // Recuperar el tipo actual de película
        const currentMovieType = state.movieListType;
        console.log(`Tipo de película actual: "${currentMovieType}"`);

        // Si el tipo de película ya es el seleccionado, no realizar actualizaciones innecesarias
        if (currentMovieType === newMovieType) {
            console.log(`El tipo de película ya está establecido como "${newMovieType}". No se realizaron cambios.`);
            return currentMovieType; // Devuelve el tipo actual si no hay cambios
        }

        // Actualizar el objeto state con el nuevo tipo
        state.movieListType = newMovieType;

      // Llamar a getMovieListData para obtener los datos del nuevo tipo de película
      const { results: movieListArray } = await getMovieListData(state.movieListType);
      if (!Array.isArray(movieListArray) || movieListArray.length === 0) {
          throw new Error('No se encontraron películas para el tipo seleccionado o la lista está vacía.');
      }

        if (!Array.isArray(movieListArray) || movieListArray.length === 0) {
            throw new Error('No se encontraron películas para el tipo seleccionado o la lista está vacía.');
        }

        // Actualizar selectOptions con los datos obtenidos
        selectOptions.listType = state.movieListType;
        selectOptions.movieDataArray = movieListArray;

        // Actualizar el contenedor de películas en la interfaz
        const moviesContainer = getMoviesListContainerElem();
        if (moviesContainer) {
            moviesContainer.innerHTML = ''; // Vaciar el contenido actual

            const newMoviesContainer = createMoviesContainerElement(movieListArray, state.movieViewType);
            moviesContainer.appendChild(newMoviesContainer);

            console.log(`Contenedor de películas actualizado con el tipo "${newMovieType}".`);
        } else {
            console.warn('No se encontró el contenedor de películas para actualizar.');
        }

        // Actualizar el select de tipo de película, si existe
        const movieTypeSelect = movieTypeSelectElem();
        if (movieTypeSelect) {
            movieTypeSelect.value = newMovieType;
            console.log('El select de tipo de película fue actualizado.');
        } else {
            console.warn('No se encontró el select de tipo de película para actualizar.');
        }

        // Retornar la lista de películas actualizadas
        return movieListArray;

    } catch (error) {
        console.error('Error al actualizar el tipo de película:', error);
        throw error; // Lanzar el error para que el manejador externo pueda capturarlo
    }
}

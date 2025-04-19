import "./scss/style.scss";
import { getAppElem, getMoviesListContainerElem } from "./util/dom";
import { createMovieListToolbar } from "./movie-detail/movie-list-toolbar"; 
import { getMovieListData } from "./api/api";
import { movieViewTypes, state, selectOptions, movieListType } from "./api/apiConfig";
import { createMoviesContainerElement} from "./movie-list/movie-list";
import { setupViewButtons, setupMovieTypeChangeEvent} from "./event/event";

async function star() {
    try {
        const { results: movieListArray } = await getMovieListData(state.movieListType);

        // Vamos guardando el array de películas en el objeto selectOptions
        selectOptions.movieDataArray = movieListArray;

        if (!movieListArray || movieListArray.length === 0) {
            console.warn('No se encontraron películas populares.');
            return;
        }

        // Crear el contenedor de películas
        const moviesContainerElement = createMoviesContainerElement(selectOptions.movieDataArray, state.movieViewType);

        // Obtener el elemento principal de la aplicación #app
        const appElement = getAppElem();
        
        // Crear el contenedor de la barra de herramientas
        appElement.appendChild(createMovieListToolbar());
        
        // Añadir el contenedor de películas al DOM
        appElement.appendChild(moviesContainerElement);

        console.log('Películas añadidas correctamente al DOM.');

        // Configurar el botón de vista al hacer click
        setupViewButtons(movieListArray);

        //updateMovieType(movieListType.Mas_valoradas)
        // Configurar el select de tipo de película
        setupMovieTypeChangeEvent('movie-type-select');
        
        console.log('Aplicación inicializada correctamente.');
    } catch (error) {
        console.error('Error al añadir las películas:', error);
    }
}
star();





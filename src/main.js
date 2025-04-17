import "./scss/style.scss";
import { getAppElem } from "./util/dom";
import { createMovieListToolbar } from "./movie-detail/movie-list-toolbar"; 
import { getMovieListData, getMovieDetailsData } from "./api/api";
import { movieViewTypes, state, selectOptions } from "./api/apiConfig";
import { createMoviesContainerElement} from "./movie-list/movie-list";
import { movieListType } from "./api/apiConfig";
import { setupViewButtons, setupMovieTypeSelect } from "./event/event";

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
        const moviesContainerElement = createMoviesContainerElement(selectOptions.movieDataArray, state.movieGridType);

        // Obtener el elemento principal de la aplicación #app
        const appElement = getAppElem();
        
        // Crear el contenedor de la barra de herramientas
        appElement.appendChild(createMovieListToolbar());
        
        // Añadir el contenedor de películas al DOM
        appElement.appendChild(moviesContainerElement);

        console.log('Películas añadidas correctamente al DOM.');

        // Configurar el botón de vista al hacer click
        setupViewButtons(movieListArray);

        // Configurar el select de tipo de película
        setupMovieTypeSelect(movieListType); // Configura el evento del selector
        
        console.log('Aplicación inicializada correctamente.');
    } catch (error) {
        console.error('Error al añadir las películas:', error);
    }
}
star();
console.log(`Tipo de vista solicitado: ${state.movieGridType}`);



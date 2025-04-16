import "./scss/style.scss";
import { getAppElem } from "./util/dom";
import { createMovieListToolbar } from "./movie-detail/movie-list-toolbar"; 
import { getMovieListData, getMovieDetailsData } from "./api/api";
import { movieViewTypes, state, selectOptions } from "./api/apiConfig";
import { createMoviesContainerElement} from "./movie-list/movie-list";
import { movieListType } from "./api/apiConfig";
import { setupListViewButton, setupGridViewButton } from "./event/event";

async function star() {
    try {
        const { results: movieListArray } = await getMovieListData(state.movieListType);
        
        // Vamos guardado el array de películas en el objeto selectOptions
        selectOptions.movieDataArray = movieListArray;
        
        if (!movieListArray || movieListArray.length === 0) {
            console.warn('No se encontraron películas populares.');
            return;
        }

        // Crear el contenedor de películas
        const moviesContainerElement = createMoviesContainerElement(selectOptions.movieDataArray ,state.movieGridType);

        // Obtener el elemento principal de la aplicación #app
        const appElement = getAppElem();
         // Crear el contenedor de la barra de herramientass
        appElement.appendChild(createMovieListToolbar())
        // Añadir el contenedor de películas al DOM
        appElement.appendChild(moviesContainerElement);

        console.log('Películas añadidas correctamente al DOM.');

        // Configurar el botón de vista lista
        setupListViewButton(movieListArray);
        // Configurar el botón de vista cuadrícula
        setupListViewButton(movieListArray);
     
    } catch (error) {
        console.error('Error al añadir las películas:', error);
    }
}

star();
console.log(`Tipo de vista solicitado: ${state.movieGridType}`);


/*
async function addMovieListGrid() {
    try {
        // Petición API con los datos de las películas
        const { results: movieListArray } = await getMovieListData(movieType.popular);

        if (!movieListArray || movieListArray.length === 0) {
            console.warn('No se encontraron películas populares.');
            return;
        }

        // Crear el elemento CONTAINER
        const containerElement = document.createElement('div');
        containerElement.classList.add('container', 'text-center');

        // Crear el elemento ROW
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        // Crear tarjetas de películas y añadirlas al ROW
        movieListArray.forEach(movieData => {
            const movieElement = createMovieCardElement(movieData);
            movieElement.classList.add('col-lg-3', 'col-md-4', 'col-sm-6');
            rowElement.appendChild(movieElement);
        });

        // Añadir el ROW al CONTAINER y este al DOM
        const appElement = document.querySelector('#app');
        if (!appElement) {
            console.error('No se encontró el elemento con ID #app.');
            return;
        }
        containerElement.appendChild(rowElement);
        appElement.appendChild(containerElement);

        console.log('Grid de películas añadido correctamente al DOM.');
    } catch (error) {
        console.error('Error al añadir el grid de películas:', error);
    }
}

addMovieListGrid();
*/


/*getMovieListData(movieType.popular)
    .then((data) => {
        const { results: movieListArray } = data;
        console.log(movieListArray);

        movieListArray.forEach(movieData => {
            createMovieCardElement(movieData)
        });
    }).catch((error) => {
        console.error(error.message);
    })
*/
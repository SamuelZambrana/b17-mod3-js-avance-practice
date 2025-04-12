import "./scss/style.scss";
import { getAppElem } from "./util/dom";
import { getMovieListData } from "./api/api";
import { createMoviesContainerElement, movieListType } from "./movie-list/movie-list";


async function star() {
    try {
        const { results: movieListArray } = await getMovieListData(movieListType.NowPlaying);

        if (!movieListArray || movieListArray.length === 0) {
            console.warn('No se encontraron películas populares.');
            return;
        }

        // Crear el contenedor de películas
        const moviesContainerElement = createMoviesContainerElement(movieListArray);

        // Añadir el contenedor al DOM
        const appElement = getAppElem();
        appElement.appendChild(moviesContainerElement);

        console.log('Películas añadidas correctamente al DOM.');
    } catch (error) {
        console.error('Error al añadir las películas:', error);
    }
}

star();

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
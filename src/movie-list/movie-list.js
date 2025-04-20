import { apiConfig, movieViewTypes } from '../api/apiConfig';


export function createMoviesContainerElement(movieData, viewType) {
    const moviesContainerElement = document.createElement('div');
    moviesContainerElement.id = 'movies-list-container';
    moviesContainerElement.classList.add('container');
    
    // Crear una fila para contener los elementos de las películas
    const rowElement = createMovieListRowElement();

    movieData.forEach(movie => {
        let movieElement;
        const grid = movieViewTypes.Grid;
        const list = movieViewTypes.List;
        // Determinar el tipo de vista: 'grid' o 'list'
        if (viewType === grid) {
            movieElement = createMovieGridElement(movie);
        } else if (viewType === list) {
            movieElement = createMovieListElement(movie);
        } else {
            throw new Error(`Vista no soportada: ${viewType}`);
        }
       
        rowElement.appendChild(movieElement);
    });

    moviesContainerElement.appendChild(rowElement);
    return moviesContainerElement; 
}

function createMovieListRowElement() {
    const rowElem = document.createElement('div');
    rowElem.className = 'row';
    return rowElem;
}

function createMovieListElement(movie) {
    // Crear el contenedor principal para una película en modo lista
    const movieListElem = document.createElement('div');
    movieListElem.className = 'movie-list-item row align-items-start mb-4'; // Clase específica para vista lista

    // Crear columna para el póster (imagen)
    const posterCol = document.createElement('div');
    posterCol.className = 'col-3'; // Ajusta la proporción para el póster en modo lista
    const posterElem = createMoviePosterElement(movie.poster_path, movie.id);
    posterElem.className = 'img-fluid rounded'; // Estilo para hacer la imagen fluida y con bordes redondeados
    posterCol.appendChild(posterElem);

    // Crear columna para los detalles
    const detailsCol = document.createElement('div');
    detailsCol.className = 'col-9'; // Ajusta el espacio para los detalles en modo lista

    // Crear y agregar el título de la película
    const titleElem = createMovieTitleElement(movie.title);
    titleElem.className = 'h5 mb-2'; // Clase para estilizar el título
    detailsCol.appendChild(titleElem);

    // Crear y agregar los datos de la película (calificación y fecha de estreno)
    const dataElem = createMovieDataElement(movie.vote_average, movie.release_date);
    dataElem.className = 'text-muted mb-2'; // Clase para estilizar el texto de calificación y fecha
    detailsCol.appendChild(dataElem);

    // Crear y agregar el resumen de la película (overview)
    const overviewElem = createMovieOverviewElement(movie.overview);
    overviewElem.className = 'text-justify'; // Clase para justificar el texto del resumen
    detailsCol.appendChild(overviewElem);

    // Añadir las columnas al contenedor principal
    movieListElem.appendChild(posterCol);
    movieListElem.appendChild(detailsCol);

    return movieListElem;
}

function createMovieGridElement(movie) {
    const movieGridElem = document.createElement('div');
    movieGridElem.className = 'movie-grid col-lg-3', 'col-md-4', 'col-sm-6';
    movieGridElem.appendChild(createMoviePosterElement(movie.poster_path, movie.id));
    movieGridElem.appendChild(createMovieTitleElement(movie.title));
    movieGridElem.appendChild(createMovieDataElement(movie.vote_average, movie.release_date));
    movieGridElem.appendChild(createMovieOverviewElement(movie.overview));
    return movieGridElem;
}

/**
 * 
 * @param {string} posterUrl 
 * @returns {HTMLImageElement} Elemento img con el posterUrl como src
 */
export function createMoviePosterElement(posterUrl, id) {
    const imgElem = document.createElement('img');
    imgElem.setAttribute('src', apiConfig.posterBaseUrl + posterUrl);
    imgElem.setAttribute('alt', 'movie poster');
    imgElem.setAttribute('data-movie-id', `${id}`);
    imgElem.classList.add('movie-poster');
    return imgElem;
}

/**
 * 
 * @param {string} title 
 * @returns {HTMLDivElement} Elemento div con el título como texto
 */
function createMovieTitleElement(title) {
    const titleElem = document.createElement('div');
    titleElem.textContent = title;
    titleElem.classList.add('movie-title');
    return titleElem;
}

/**
 * 
 * @param {string} overview 
 * @returns {HTMLDivElement} Elemento div con la descripción como texto
 */
function createMovieOverviewElement(overview) {
    const descriptionElem = document.createElement('div');
    descriptionElem.textContent = overview;
    descriptionElem.classList.add('movie-overview');
    return descriptionElem;
}

function createMovieDataElement(rating, year) {
    const movieDataElem = document.createElement('div');
    movieDataElem.classList.add('movie-data');
    movieDataElem.textContent = `Valoracion: ${rating} | Año: ${year}`;
    return movieDataElem;
}
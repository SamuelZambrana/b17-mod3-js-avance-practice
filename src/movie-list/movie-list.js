import { apiConfig } from '../api/apiConfig';

export const movieListType = {
    Popular: 'popular',
    Incoming: 'incoming',
    MostRated: 'most_rated',
    NowPlaying: 'now_playing',
};

export function createMoviesContainerElement(movieData) {
    const moviesContainerElement = document.createElement('div');
    moviesContainerElement.id = 'movies-list-container';
    moviesContainerElement.classList.add('container');
    
    const rowElement = createMovieListRowElement();

    movieData.forEach(movie => {
        const movieGridElement = createMovieGridElement(movie);
        rowElement.appendChild(movieGridElement);
    })

    moviesContainerElement.appendChild(rowElement);
    return moviesContainerElement;
}

export function createMovieCardElement(movie) {
    const movieElem = createMovieElement();

    movieElem.appendChild(createMoviePosterElement(movie.poster_path)); 
    movieElem.appendChild(createMovieTitleElement(movie.title));
    movieElem.appendChild(createMovieDescriptionElement(movie.overview)); 
     
     return movieElem;
}

function createMovieElement() {
    const movieElem = document.createElement('div');
    movieElem.classList.add('movie');
    return movieElem;
}

function createMovieListRowElement() {
    const rowElem = document.createElement('div');
    rowElem.className = 'row';
    return rowElem;
}

function createMovieGridElement(movie) {
    const movieGridElem = document.createElement('div');
    movieGridElem.className = 'movie-grid col-lg-3', 'col-md-4', 'col-sm-6';
    movieGridElem.appendChild(createMoviePosterElement(movie.poster_path, movie.id));
    movieGridElem.appendChild(createMovieTitleElement(movie.title));
    movieGridElem.appendChild(createMovieTitleElement(movie.rating, movie.year));
    movieGridElem.appendChild(createMovieDescriptionElement(movie.overview));
    return movieGridElem;
}


/**
 * 
 * @param {string} posterUrl 
 * @returns {HTMLImageElement} Elemento img con el posterUrl como src
 */
function createMoviePosterElement(posterUrl, id) {
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
 * @param {string} description 
 * @returns {HTMLDivElement} Elemento div con la descripción como texto
 */
function createMovieDescriptionElement(description) {
    const descriptionElem = document.createElement('div');
    descriptionElem.textContent = description;
    descriptionElem.classList.add('movie-description');
    return descriptionElem;
}

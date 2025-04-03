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

// Base URL para los posters definida como constante
const POSTER_BASE_URL = 'http://image.tmdb.org/t/p/w500/';

/**
 * 
 * @param {string} posterUrl 
 * @returns {HTMLImageElement} Elemento img con el posterUrl como src
 */
function createMoviePosterElement(posterUrl) {
    const imgElem = document.createElement('img');
    imgElem.setAttribute('src', `${POSTER_BASE_URL}${posterUrl}`);
    imgElem.setAttribute('alt', 'movie poster');
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

import "./scss/style.scss";
import { movieType, getMovieListData } from "./api/api";
import { createMovieCardElement } from "./movie-card/movieCard";


async function addMovieListGrid() {
    // Peticion API con los datos de las peliculas
    const { results: movieListArray} = await getMovieListData(movieType.popular);

    // Creo el elemento ROW
    const rowElement = document.createElement('div');
    rowElement.classList = 'row';

    // Por cada datos de peliculas creo un elemento tarjeta pelicula
    movieListArray.forEach(movieData => {
        const movieElement = createMovieCardElement(movieData);
        movieElement.classList += 'col-lg-3 col-md-4 col-sm-6'
        // Añado el elemento pelicula al elemento ROW
        rowElement.appendChild(movieElement)
    });

    // Finalmente añado el elemento ROW al CONTAINER
    const containerElement = document.querySelector('#app');
    containerElement.appendChild(rowElement);
}

addMovieListGrid();



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
import { viewSelectElem, moviesCategoriesElem, getButtonBackElem, getMoviesListContainerElem} from '../util/dom.js';
import { createMoviePosterElement } from '../movie-list/movie-list.js'


 /*// Recuperar el elemento de selección de vista y lo ocultamos
const viewIconsButton = viewSelectElem();
viewIconsButton.setAttribute('hidden', true);

// Recuperar el elemento de selección de categorías y lo ocultamos
const categoriesSelect = moviesCategoriesElem();
categoriesSelect.setAttribute('hidden', true);

// Recuperar el elemento back del main
const backButton = getButtonBackElem();
backButton.removeAttribute('hidden');
*/


/**
 * @descripcion Function to create the movie details page
 * @param {Object} movieId - The movie object containing details
 * @param {} movieId 
 * @returns {Promise<void>}
 */
export async function createMovieDetailsPage(movieId) {
    const movieDetailsContainer = getMoviesListContainerElem(); // Contenedor principal

    try {
        const movieDetailsElem = document.createElement('div');
        movieDetailsElem.className = 'movie-details-container container-fluid';

        // Crear un contenedor para la sección con imagen de fondo
        const infoContainer = document.createElement('div');
        infoContainer.className = 'd-flex align-items-center'; // Alinear elementos lado a lado
        infoContainer.style.position = 'relative';
        infoContainer.style.width = '100%';
        infoContainer.style.minHeight = '400px'; // Ajustar altura mínima
        infoContainer.style.background = `
            linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${movieId.backdrop_path ? `https://image.tmdb.org/t/p/w500${movieId.backdrop_path}` : "path/to/default-background.jpg"})
        `;
        infoContainer.style.backgroundSize = 'cover';
        infoContainer.style.backgroundPosition = 'center';
        infoContainer.style.backgroundRepeat = 'no-repeat';
        infoContainer.style.marginBottom = '20px'; // Separación con otras secciones

        // Foto de la película
        const posterCol = document.createElement('div');
        posterCol.className = 'col-md-4 text-center';
        posterCol.style.padding = '20px';
        const posterImg = document.createElement('img');
        posterImg.src = movieId.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieId.poster_path}`
            : "path/to/default-image.jpg"; // Imagen por defecto
        posterImg.alt = `Póster de ${movieId.title || "Título desconocido"}`;
        posterImg.className = 'img-fluid rounded shadow';
        posterImg.style.maxWidth = '250px'; // Ajustar tamaño de la imagen
        posterCol.appendChild(posterImg);
        infoContainer.appendChild(posterCol);

        // Detalles de la película
        const detailsCol = document.createElement('div');
        detailsCol.className = 'col-md-8 text-white';
        detailsCol.style.padding = '20px';

        const titleElem = document.createElement('h1');
        titleElem.textContent = movieId.title || "Título desconocido";
        titleElem.className = 'mb-3';
        titleElem.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.7)';
        detailsCol.appendChild(titleElem);

        const classificationAndYear = document.createElement('div');
        classificationAndYear.innerHTML = `
            <p><strong>Calificación:</strong> ${movieId.vote_average || "N/A"}/10</p>
            <p><strong>Año:</strong> ${movieId.release_date || "N/A"}</p>
        `;
        classificationAndYear.className = 'mb-4';
        detailsCol.appendChild(classificationAndYear);

        const descriptionElem = document.createElement('p');
        descriptionElem.textContent = movieId.overview || "No hay descripción disponible.";
        descriptionElem.className = 'mb-4';
        detailsCol.appendChild(descriptionElem);

        infoContainer.appendChild(detailsCol);
        movieDetailsElem.appendChild(infoContainer);

        // Sección de actores principales (Reparto)
        const castTitle = document.createElement('h3');
        castTitle.textContent = "Reparto";
        castTitle.className = 'mt-4 text-black text-center';
        movieDetailsElem.appendChild(castTitle);

        const castContainer = document.createElement('div');
        castContainer.className = 'd-flex flex-wrap justify-content-center gap-3'; // Responsive diseño de actores

        if (movieId.credits && movieId.credits.cast && movieId.credits.cast.length > 0) {
            movieId.credits.cast.slice(0, 5).forEach((actor) => {
                const castCard = document.createElement('div');
                castCard.className = 'text-center p-2';
                castCard.style.minWidth = '120px';
                castCard.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                castCard.style.borderRadius = '10px';

                const profileElem = document.createElement('img');
                profileElem.src = actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : "path/to/default-profile.jpg"; // Imagen por defecto
                profileElem.alt = actor.name;
                profileElem.className = 'img-fluid rounded-circle shadow mb-2';
                profileElem.style.width = '100px';
                profileElem.style.height = '100px';
                castCard.appendChild(profileElem);

                const nameElem = document.createElement('p');
                nameElem.innerHTML = `<strong>${actor.name}</strong>`;
                nameElem.className = 'mb-1 text-black';
                nameElem.style.fontWeight = 'bold';
                castCard.appendChild(nameElem);

                const characterElem = document.createElement('p');
                characterElem.textContent = `como ${actor.character}`;
                characterElem.className = 'text-muted small';
                castCard.appendChild(characterElem);

                castContainer.appendChild(castCard);
            });
        } else {
            const noCastMessage = document.createElement('p');
            noCastMessage.textContent = "No hay actores disponibles.";
            noCastMessage.className = 'text-muted text-center';
            castContainer.appendChild(noCastMessage);
        }

        movieDetailsElem.appendChild(castContainer);

        // Sección de directores
        const directorsTitle = document.createElement('h3');
        directorsTitle.textContent = "Directores";
        directorsTitle.className = 'mt-4 text-black text-center';
        movieDetailsElem.appendChild(directorsTitle);

        const directorContainer = document.createElement('div');
        directorContainer.className = 'd-flex flex-wrap justify-content-center gap-3'; // Responsive diseño de directores

        // Filtrar los directores correctamente
        const directors = movieId.credits.crew.filter((crew) => crew.job);

        // Validar y mostrar hasta 10 directores
        if (directors && directors.length > 0) {
            directors.slice(0, 6).forEach((director) => {
                const directorCard = document.createElement('div');
                directorCard.className = 'text-center p-2';
                directorCard.style.minWidth = '120px';
            directorCard.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            directorCard.style.borderRadius = '10px';

        // Foto del director
        const profileElem = document.createElement('img');
        profileElem.src = director.profile_path
            ? `https://image.tmdb.org/t/p/w500${director.profile_path}`
            : "path/to/default-profile.jpg"; // Imagen por defecto
        profileElem.alt = director.name || "Sin nombre disponible";
        profileElem.className = 'img-fluid rounded-circle shadow mb-2';
        profileElem.style.width = '100px';
        profileElem.style.height = '100px';
        directorCard.appendChild(profileElem);

        // Nombre del director
        const nameElem = document.createElement('p');
        nameElem.innerHTML = `<strong>${director.name || "Sin nombre disponible"}</strong>`;
        nameElem.className = 'text-black mt-2';
        nameElem.style.fontWeight = 'bold';
        directorCard.appendChild(nameElem);

        // Trabajo del director (job)
        const jobElem = document.createElement('p');
        jobElem.textContent = `Trabajo: ${director.job || "No especificado"}`;
        jobElem.className = 'text-muted small';
        directorCard.appendChild(jobElem);

        directorContainer.appendChild(directorCard);
    });
        } else {
        // Mostrar mensaje si no hay directores disponibles
        const noDirectorsMessage = document.createElement('p');
        noDirectorsMessage.textContent = "No hay directores disponibles.";
        noDirectorsMessage.className = 'text-muted text-center';
        directorContainer.appendChild(noDirectorsMessage);
    }

        movieDetailsElem.appendChild(directorContainer);

        // Limpiar el contenedor principal y añadir el contenido
        movieDetailsContainer.innerHTML = '';
        movieDetailsContainer.appendChild(movieDetailsElem);
    } catch (error) {
        console.error('Error:', error.message);
        movieDetailsContainer.innerHTML = '<p>Error al cargar los detalles de la película.</p>';
    }
}










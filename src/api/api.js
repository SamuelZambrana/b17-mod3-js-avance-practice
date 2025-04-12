import axios from 'axios';
import { apiConfig } from './apiConfig';

export const movieListType = {
    Popular: 'popular',
    Incoming: 'incoming',
    MostRated: 'most_rated',
    NowPlaying: 'now_playing',
};

/**
 * Obtiene los datos de la lista de películas según el tipo
 * @param {string} type - Tipo de películas (popular, topRated, etc.)
 * @returns {Promise<Object>} Datos de las películas
 */
export async function getMovieListData(type) {
   const url = getMovieListUrl(type, apiConfig);
   try {
       const response = await axios.get(url);
       return response?.data;
   } catch (error) {
       console.error('Error al obtener la lista de películas:', error);
       throw error;
   }
}

/**
 * Genera la URL de la API para obtener la lista de películas
 * @param {string} type - Tipo de películas (popular, topRated, etc.)
 * @param {Object} apiConfig - Objeto de configuración con baseUrl, apiKey y langIso
 * @returns {string} URL para la solicitud a la API
 */
function getMovieListUrl(type, apiConfig) {
    let movieListUrl = apiConfig.baseUrl;
    movieListUrl += `movie/${type}`
    movieListUrl += `?api_key=${apiConfig.apiKey}`;
    movieListUrl += `&language=${apiConfig.langIso}`;
    movieListUrl += `&page=1`;
    return movieListUrl;
}
    

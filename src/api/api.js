import axios from 'axios';
import { apiConfig } from './apiConfig';

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
function getMovieListUrl(type, apiConfig, pageNumber = 1) {
    let movieListUrl = apiConfig.baseUrl;
    movieListUrl += `movie/${type}`
    movieListUrl += `?api_key=${apiConfig.apiKey}`;
    movieListUrl += `&language=${apiConfig.langIso}`;
    movieListUrl += `&page=${pageNumber}`;
    return movieListUrl;
}

export async function getMovieDetailsData(id) {
    const url = getMovieDetailsUrl(id);
    try {
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
        throw error;
    }
}

function getMovieDetailsUrl(id) {
    let movieDetailsUrl = apiConfig.baseUrl;
    movieDetailsUrl += `movie/${id}`
    movieDetailsUrl += `?api_key=${apiConfig.apiKey}`;
    movieDetailsUrl += `&language=${apiConfig.langIso}`;
    movieDetailsUrl += `&append_to_response=credits`;
    return movieDetailsUrl;
}
    

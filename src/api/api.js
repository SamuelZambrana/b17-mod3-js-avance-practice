import axios from 'axios';
import { apiConfig } from './apiConfig';

export const movieType = {
    popular: 'popular',
    topRated: 'top_rated',
    upcoming: 'upcoming',
    nowPlaying: 'now_playing',
}

export async function getMovieListData(type) {
    let movieListUrl = apiConfig.baseUrl;
    movieListUrl += `movie/${type}`;
    movieListUrl += `?api_key=${apiConfig.apiKey}`;
    movieListUrl += `&language=${apiConfig.langIso}`;
    return (await axios(movieListUrl))?.data;
}

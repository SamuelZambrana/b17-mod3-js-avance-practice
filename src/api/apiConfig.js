export const movieListType = {
    Popular: 'popular',
    Incoming: 'incoming',
    MostRated: 'most_rated',
    NowPlaying: 'now_playing',
};

export const movieViewTypes = {
    Grid: 'movie-grid',
    List: 'movie-list',
    Details: 'movie-details',
}

export const state = {
    movieListType: movieListType.NowPlaying,
    movieGridType: movieViewTypes.Grid,
    page: 1,
}

export let selectOptions = {
    viewType: state.movieViewType,
    listType: state.movieListType,
    page: state.page,
    movieDataArray: undefined
}


export const apiConfig = {
    apiKey: 'c707d353f454eb5bf3e26d7646581a41',
    langIso: 'es-ES',
    baseUrl: 'https://api.themoviedb.org/3/',
    posterBaseUrl: 'http://image.tmdb.org/t/p/w500/',
    backdropBaseUrl: 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces',
    photoBaseUrl: 'https://media.themoviedb.org/t/p/w138_and_h175_face',
    defaultValue:  'Not available'
}
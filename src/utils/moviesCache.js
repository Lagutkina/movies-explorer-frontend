import {
  MOVIES_CACHE_KEY,
  MOVIES_CACHE_SEARCH_TERM_KEY,
  MOVIES_CACHE_SEARCH_CHECK,
} from './constants';

export const setMoviesCache = (movies, searchTerm, isShort) => {
  localStorage.setItem(MOVIES_CACHE_SEARCH_TERM_KEY, searchTerm);
  localStorage.setItem(MOVIES_CACHE_SEARCH_CHECK, isShort);
  localStorage.setItem(MOVIES_CACHE_KEY, JSON.stringify(movies));
};

export const getMoviesCache = () => {
  try {
    const movies = JSON.parse(localStorage.getItem(MOVIES_CACHE_KEY));
    const searchTerm = localStorage.getItem(MOVIES_CACHE_SEARCH_TERM_KEY);
    const isShort = localStorage.getItem(MOVIES_CACHE_SEARCH_CHECK);
    if (!Array.isArray(movies)) {
      throw new Error();
    }
    return { movies, searchTerm, isShort };
  } catch (e) {
    localStorage.removeItem(MOVIES_CACHE_KEY);
    localStorage.removeItem(MOVIES_CACHE_SEARCH_TERM_KEY);
    return { movies: false, searchTerm: '', isShort: false };
  }
};

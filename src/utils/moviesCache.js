import {
  MOVIES_CACHE_SEARCH_TERM_KEY,
  MOVIES_CACHE_SEARCH_CHECK,
} from './constants';

export const setMoviesCache = (searchTerm, isShort) => {
  localStorage.setItem(MOVIES_CACHE_SEARCH_TERM_KEY, searchTerm);
  isShort
    ? localStorage.setItem(MOVIES_CACHE_SEARCH_CHECK, true)
    : localStorage.removeItem(MOVIES_CACHE_SEARCH_CHECK);
};

export const getMoviesCache = () => {
  try {
    const searchTerm = localStorage.getItem(MOVIES_CACHE_SEARCH_TERM_KEY) || '';
    const isShort = !!localStorage.getItem(MOVIES_CACHE_SEARCH_CHECK);
    return { searchTerm, isShort };
  } catch (e) {
    localStorage.removeItem(MOVIES_CACHE_SEARCH_TERM_KEY);
    localStorage.removeItem(MOVIES_CACHE_SEARCH_CHECK);
    return { searchTerm: '', isShort: false };
  }
};

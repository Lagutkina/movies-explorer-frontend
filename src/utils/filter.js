// Поиск может производитьсы по многим полям но задача искать только в иимении
const movieKeys = [
  'nameRU',
  'nameEN',
  /*
  'director',
  'country',
  'year',
  'description',*/
];
export function filterMovies(movies, searchTerm, isShort) {
  const term = searchTerm.toLowerCase();
  const filtered = movies.filter((movie) => {
    if (isShort) {
      if (movie.duration > 40) return false;
    }
    for (let i = 0; i < movieKeys.length; i++) {
      if (movie[movieKeys[i]]?.toLowerCase().includes(term)) return true;
    }
    return false;
  });

  return filtered;
}
export function transformMoviesData(movies) {
  return movies.map((movie) => ({
    country: movie.country || '',
    director: movie.director || '',
    duration: movie.duration || 0,
    year: movie.year || '',
    description: movie.description || '',
    image: `https://api.nomoreparties.co${movie.image?.url}`,
    trailerLink: movie.trailerLink || '',
    thumbnail: `https://api.nomoreparties.co${movie.image?.formats?.thumbnail?.url}`,
    movieId: movie.id || 0,
    nameRU: movie.nameRU || '',
    nameEN: movie.nameEN || '',
  }));
}

export default filterMovies;

const movieKeys = [
  'nameRU',
  'nameEN',
  'director',
  'country',
  'year',
  'description',
];
function filterMovies(movies, searchTerm, isShort, transform) {
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

  return transform ? transformMoviesData(filtered) : filtered;
}
function transformMoviesData(movies) {
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

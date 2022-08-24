const movieKeys = [
  'nameRU',
  'nameEN',
  'director',
  'country',
  'year',
  'description',
];
function filterMovies(movies, serchTerm, isShort) {
  return movies.filter((movie) => {
    if (isShort) {
      if (movie.duration > 40) return false;
    }
    for (let i = 0; i < movieKeys.length; i++) {
      if (movie[movieKeys[i]]?.includes(serchTerm)) return true;
    }
    return false;
  });
}

export default filterMovies;

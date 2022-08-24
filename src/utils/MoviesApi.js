class MoviesApi {
  constructor(url) {
    this._url = url;
  }
  getMovies() {
    return fetch(this._url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export default new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

class MoviesApi {
  constructor(url) {
    this._url = url;
  }
  getMovies() {
    return fetch(this._url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );
    });
  }
}

export default new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

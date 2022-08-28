import { TOKEN } from '../utils/constants';
class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._token = options.token;
  }
  updateToken(token) {
    this._token = token;
  }
  _fetch(method, path, body) {
    return fetch(`${this._baseUrl}/${path}`, {
      method,
      headers: {
        authorization: this._token ? `Bearer ${this._token}` : undefined,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // Есть проблема с результатом то возвращаем ошибку
        return res.json().then((result) => Promise.reject(result.message));
      })
      .catch((e) => {
        return Promise.reject(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      });
  }
  signUp(userData) {
    return this._fetch('POST', 'signup', userData).then((data) => {
      if (data.token) {
        localStorage.setItem(TOKEN, data.token);
        this._token = data.token;
      }
      return data;
    });
  }

  signIn(userData) {
    return this._fetch('POST', 'signin', userData).then((data) => {
      if (data.token) {
        localStorage.setItem(TOKEN, data.token);
        this._token = data.token;
      }
      return data;
    });
  }
  getUserInfo() {
    return this._fetch('GET', 'users/me');
  }
  updateProfile(userData) {
    return this._fetch('PATCH', 'users/me', userData);
  }
  getMovies() {
    return this._fetch('GET', 'movies');
  }
  addNewMovie(movieData) {
    return this._fetch('POST', 'movies', movieData);
  }

  deleteMovie(movieId) {
    return this._fetch('DELETE', `movies/${movieId}`);
  }

  changeLikeCardStatus(cardId, isLike) {
    if (isLike) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }
}

export default new MainApi({
  baseUrl: 'https://api.lagutkina.nomoredomains.sbs',
  token: localStorage.getItem(TOKEN),
});

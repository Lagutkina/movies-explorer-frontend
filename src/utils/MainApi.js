class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(method, path, body) {
    return fetch(`${this._baseUrl}/${path}`, {
      method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  signUp(name, email, password) {
    return this._fetch('POST', 'signup', { name, email, password });
  }

  signIn(email, password) {
    return this._fetch('POST', 'signin', { email, password }).then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        this._headers = {
          authorization: `Bearer ${data.token}`,
          'Content-Type': 'application/json',
        };
      }
      return data;
    });
  }
  getUserInfo() {
    return this._fetch('GET', 'users/me');
  }
  updateProfile(name, email) {
    return this._fetch('PATCH', 'users/me', { name, email });
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

  addLike(cardId) {
    return this._fetch('PUT', `cards/${cardId}/likes`);
  }
  deleteLike(cardId) {
    return this._fetch('DELETE', `cards/${cardId}/likes`);
  }
  updateAvatar(avatar) {
    return this._fetch('PATCH', 'users/me/avatar', { avatar });
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
  baseUrl: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json',
  },
});

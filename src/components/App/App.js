import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import filterMovies from '../../utils/filter';
import ToolTip from '../ToolTip/ToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { MOVIES, SAVED } from '../../utils/constants';

import './App.css';

const MOVIES_CACHE_KEY = 'movies';
const MOVIES_CACHE_SEARCH_TERM_KEY = 'movies-term';
const MOVIES_CACHE_SEARCH_CHECK = 'movies-check';

const setMoviesCache = (movies, searchTerm, isShort) => {
  localStorage.setItem(MOVIES_CACHE_SEARCH_TERM_KEY, searchTerm);
  localStorage.setItem(MOVIES_CACHE_SEARCH_CHECK, isShort);
  localStorage.setItem(MOVIES_CACHE_KEY, JSON.stringify(movies));
  console.log(localStorage.getItem(MOVIES_CACHE_KEY));
  console.log(localStorage.getItem(MOVIES_CACHE_SEARCH_TERM_KEY));
};

const getMoviesCache = () => {
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

function App() {
  const cache = getMoviesCache();
  const history = useHistory(); // создаем константу для истории
  const [isLoading, setIsLoading] = useState(false); // ожидание данных с сервера для дезактивации кнопки сабмита формы
  const [errorToolTip, setErrorToolTip] = useState(false); // попап с ошибками
  const [loggedIn, setLoggedIn] = useState(false); // состояние залогинен или нет
  const [currentUser, setCurrentUser] = useState({}); //создание стейта для currentUser
  const [ready, setReady] = useState(false); // начальная подгрузка юзера при обновлении
  const [movies, setMovies] = useState(cache.movies);
  const [savedMovies, setSavedMovies] = useState(false);
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);

  //Лайки и добавление
  function handleSaveMovie(movieData) {
    mainApi
      .addNewMovie(movieData)
      .then(() => {
        loadSavedMovies();
      })
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
      });
  }

  function handleRemoveMovie(movieId) {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        loadSavedMovies();
      })
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
      });
  }

  function loadSavedMovies() {
    mainApi
      .getMovies()
      .then((movies) => {
        setSavedMoviesIds(movies.map((movie) => movie.movieId));
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
      });
  }

  //Начальная загрузка данных о пользователе
  useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err))
        .finally(() => setReady(true));
    } else {
      setReady(true);
    }
  }, []);
  //загрузка карточек
  useEffect(() => {
    if (loggedIn) {
      loadSavedMovies();
    }
  }, [loggedIn]);

  //Поиск карточек
  function handleSearch(source, searchTerm, isShort) {
    if (!searchTerm) {
      return setErrorToolTip('Нужно ввести ключевое слово');
    }
    if (source === MOVIES) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((res) => {
          const filtered = filterMovies(res, searchTerm, isShort, true);
          setMoviesCache(filtered, searchTerm);
          setMovies(filtered);
        })
        .catch((err) => {
          setErrorToolTip(err);
        })
        .finally(() => setIsLoading(false));
    } else if (source === SAVED) {
      setIsLoading(true);

      mainApi
        .getMovies()
        .then((res) => {
          const filtered = filterMovies(res, searchTerm, isShort, false);
          setSavedMoviesIds(res.map((movie) => movie.movieId));
          setSavedMovies(filtered);
        })
        .catch((err) => {
          setErrorToolTip(err);
        })
        .finally(() => setIsLoading(false));
    }
  }

  // Регистрация
  function handleRegister(name, email, password) {
    setIsLoading(true);
    return mainApi
      .signUp({ name, email, password })
      .then(({ token, ...userData }) => {
        // setSuccesToolTip(true);
        setCurrentUser(userData);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
      })
      .finally(() => setIsLoading(false));
  }
  //Логинимся
  function handleAuthorize(email, password) {
    setIsLoading(true);
    return mainApi
      .signIn({ email, password })
      .then(({ token, ...userData }) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
        throw err;
      })
      .finally(() => setIsLoading(false));
  }
  //LOG OUT
  function handleLogout() {
    localStorage.removeItem('token');
    mainApi.updateToken(null);
    setLoggedIn(false);
    history.push('/');
  }
  //обновляем информацию о юзере
  function handleUpdateUser(name, email) {
    return mainApi
      .updateProfile({ name, email })
      .then((userData) => setCurrentUser(userData))
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
        throw err;
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <ToolTip err={errorToolTip} onClose={() => setErrorToolTip(false)} />
          <Switch>
            <Route exact path="/">
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute
              ready={ready}
              loggedIn={loggedIn}
              exact
              path="/movies"
            >
              <Header loggedIn={loggedIn} />
              <Movies
                onSearch={handleSearch}
                movies={movies}
                savedMoviesIds={savedMoviesIds}
                isLoading={isLoading}
                onLike={handleSaveMovie}
                onRemove={handleRemoveMovie}
                searchTerm={cache.searchTerm}
                isShort={cache.isShort}
              />
              <Footer />
            </ProtectedRoute>

            <ProtectedRoute
              ready={ready}
              loggedIn={loggedIn}
              exact
              path="/saved-movies"
            >
              <Header loggedIn={loggedIn} />
              <SavedMovies
                isLoading={isLoading}
                movies={savedMovies}
                onSearch={handleSearch}
                onRemove={handleRemoveMovie}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute
              ready={ready}
              loggedIn={loggedIn}
              exact
              path="/profile"
            >
              <Header loggedIn={loggedIn} />
              <Profile onLogout={handleLogout} onUpdate={handleUpdateUser} />
            </ProtectedRoute>
            <Route exact path="/signin">
              <Login isLoading={isLoading} onLogin={handleAuthorize} />
            </Route>
            <Route exact path="/signup">
              <Register onRegister={handleRegister} isLoading={isLoading} />
            </Route>
            <Route path="/">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

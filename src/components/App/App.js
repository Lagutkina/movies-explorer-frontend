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
import { transformMoviesData } from '../../utils/filter';
import ToolTip from '../ToolTip/ToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { setMoviesCache, getMoviesCache } from '../../utils/moviesCache';
import {
  MOVIES_CACHE_SEARCH_TERM_KEY,
  MOVIES_CACHE_SEARCH_CHECK,
  TOKEN,
} from '../../utils/constants';

import './App.css';

function App() {
  // сохраненные состояния о последнем поиске
  const cache = getMoviesCache();
  const history = useHistory(); // создаем константу для истории
  const [isLoading, setIsLoading] = useState(false); // ожидание данных с сервера для дезактивации кнопки сабмита формы
  const [errorToolTip, setErrorToolTip] = useState(false); // попап с ошибками
  const [succesToolTip, setSuccesToolTip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // состояние залогинен или нет
  const [currentUser, setCurrentUser] = useState({}); //создание стейта для currentUser
  const [ready, setReady] = useState(false); // начальная подгрузка юзера при обновлении
  // Полный список фильмов с сервера
  const [movies, setMovies] = useState(false);
  // Полный список сохраненных фильмов из апи
  const [savedMovies, setSavedMovies] = useState(false);
  // Список айди сохраненных фильмов
  const [savedMoviesIds, setSavedMoviesIds] = useState([]);
  // Текущий поисковый запрос для фильмов
  const [moviesSearchTerm, setMoviesSearchTerm] = useState(cache.searchTerm);
  const [moviesSearchShort, setMoviesSearchShort] = useState(cache.isShort);

  //Лайки и добавление
  function handleSaveMovie(movieData) {
    mainApi
      .addNewMovie(movieData)
      .then(() => {
        const newSavedMovies = [...savedMovies, movieData];
        setSavedMoviesIds(newSavedMovies.map((movie) => movie.movieId));
        setSavedMovies(newSavedMovies);
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
        const newSavedMovies = savedMovies.filter(
          (movie) => movie.movieId !== movieId
        );
        setSavedMoviesIds(newSavedMovies.map((movie) => movie.movieId));
        setSavedMovies(newSavedMovies);
      })
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
      });
  }
  // Загрузка сохраненных фильмов из бекенда
  function loadSavedMovies() {
    setIsLoading(true);
    return mainApi
      .getMovies()
      .then((movies) => {
        setSavedMoviesIds(movies.map((movie) => movie.movieId));
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err);
        setErrorToolTip(err);
      })
      .finally(() => setIsLoading(false));
  }
  // Загрузка  фильмов с сервера
  function loadMovies() {
    setIsLoading(true);
    return moviesApi
      .getMovies()
      .then((res) => {
        setMovies(transformMoviesData(res));
      })
      .catch((err) => {
        setErrorToolTip(err);
      })
      .finally(() => setIsLoading(false));
  }

  //Начальная загрузка данных о пользователе
  useEffect(() => {
    if (localStorage.getItem(TOKEN)) {
      mainApi
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          // Комментарий: при неправильном токене происходит редирект на страницу входа
          history.push('/signin');
        })
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

  //загрузка карточек
  useEffect(() => {
    if (moviesSearchTerm) {
      loadMovies();
    }
  }, [moviesSearchTerm]);

  //Поиск карточек
  function handleSearch(searchTerm, isShort) {
    if (!searchTerm) {
      return setErrorToolTip('Нужно ввести ключевое слово');
    }

    // Кешируем поисковые фильтры
    setMoviesCache(searchTerm, isShort);

    // Устанавливаем поисковые фильтры
    setMoviesSearchTerm(searchTerm);
    setMoviesSearchShort(isShort);

    // Загружаем данные с сервера если еще не сделали этого раньше
    if (!movies) {
      loadMovies();
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
    localStorage.removeItem(TOKEN);
    mainApi.updateToken(null);
    localStorage.removeItem(MOVIES_CACHE_SEARCH_TERM_KEY);
    localStorage.removeItem(MOVIES_CACHE_SEARCH_CHECK);
    setSavedMovies(false);
    setMovies(false);
    setLoggedIn(false);
    history.push('/');
  }
  //обновляем информацию о юзере
  function handleUpdateUser(name, email) {
    return mainApi
      .updateProfile({ name, email })
      .then((userData) => {
        setCurrentUser(userData);
        setSuccesToolTip('Успешно!');
      })
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
          <ToolTip
            err={errorToolTip}
            succes={succesToolTip}
            onClose={() => {
              setErrorToolTip(false);
              setSuccesToolTip(false);
            }}
          />
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
                searchTerm={moviesSearchTerm}
                isShort={moviesSearchShort}
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
            {!loggedIn &&
              ready && [
                <Route exact path="/signin">
                  <Login isLoading={isLoading} onLogin={handleAuthorize} />
                </Route>,
                <Route exact path="/signup">
                  <Register onRegister={handleRegister} isLoading={isLoading} />
                </Route>,
              ]}
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

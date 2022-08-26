import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useState } from 'react';
import Input from '../Input/Input';
function Profile(props) {
  // подписываем на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false); //включаем возможность редактирования по кнопке редактировать
  const readOnly = !isEdit;
  //задаем переменные формы - пароль и емейл и вешаем обработчикии изменения стейта
  const [values, setValues] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [valid, setValid] = useState({
    name: true,
    email: true,
  });

  function handleChange(e) {
    const { name, value, validity } = e.target;
    setValues({ ...values, [name]: value });
    setValid({ ...valid, [name]: validity.valid });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props
      .onUpdate(values.name, values.email)
      .then((res) => {
        console.log(res);
        setIsEdit(false);
      })
      .catch((err) => console.log(err));
  }
  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <div className="profile__info">
          <Input
            title="Имя"
            name="name"
            type="text"
            minlength="6"
            maxlength="30"
            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            value={currentUser.name}
            readOnly={readOnly}
            onChange={handleChange}
          />
          <Input
            type="email"
            title="E-mail"
            name="email"
            value={currentUser.email}
            readOnly={readOnly}
            onChange={handleChange}
          />
        </div>

        <div className="profile__bottom">
          {!isEdit && (
            <p
              className="profile__bottom-link"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Редактировать
            </p>
          )}
          {isEdit && (
            <button
              className="profile__bottom-link"
              onClick={handleSubmit}
              disabled={
                !valid.email ||
                !valid.name ||
                (currentUser.name === values.name &&
                  currentUser.email === values.email)
              }
            >
              Сохранить изменения
            </button>
          )}
          <p
            onClick={props.onLogout}
            className="profile__bottom-link profile__bottom-link_red"
          >
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </section>
  );
}
export default Profile;

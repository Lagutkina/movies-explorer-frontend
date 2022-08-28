import './Register.css';
import { useState } from 'react';
import WelcomeForm from '../WelcomeForm/WelcomeForm';
import Input from '../Input/Input';
function Register(props) {
  //задаем переменные формы - пароль и емейл и вешаем обработчикии изменения стейта
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [valid, setValid] = useState({
    name: false,
    email: false,
    password: false,
  });
  function handleChange(e) {
    const { name, value, validity } = e.target;
    setValues({ ...values, [name]: value });
    setValid({
      ...valid,
      [name]: validity.valid,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values.name, values.email, values.password);
  }

  return (
    <WelcomeForm
      title="Добро пожаловать!"
      submitValue="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="Войти"
      linkTo="/signin"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isValid={valid.name && valid.email && valid.password}
    >
      <Input
        title="Имя"
        name="name"
        type="text"
        minlength="6"
        maxlength="30"
        pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
        onChange={handleChange}
        disabled={props.isLoading}
      />
      <Input
        title="E-mail"
        name="email"
        type="email"
        pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
        onChange={handleChange}
        disabled={props.isLoading}
      />
      <Input
        title="Пароль"
        name="password"
        type="password"
        minlength="6"
        onChange={handleChange}
        disabled={props.isLoading}
      />
    </WelcomeForm>
  );
}
export default Register;

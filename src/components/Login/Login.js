import Input from '../Input/Input';
import WelcomeForm from '../WelcomeForm/WelcomeForm';
import { useState } from 'react';

function Login(props) {
  //задаем переменные формы - пароль и емейл и вешаем обработчикии изменения стейта
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [valid, setValid] = useState({
    email: false,
    password: false,
  });
  function handleChange(e) {
    const { name, value, validity } = e.target;
    setValues({ ...values, [name]: value });
    setValid({ ...valid, [name]: validity.valid });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }
  return (
    <WelcomeForm
      title="Рады видеть!"
      submitValue="Войти"
      question="Ещё не зарегистрированы?"
      link="Регистрация"
      linkTo="/signup"
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isValid={valid.email && valid.password}
    >
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

export default Login;

import Input from '../Input/Input';
import WelcomeForm from '../WelcomeForm/WelcomeForm';

function Login(props) {
  return (
    <WelcomeForm
      title="Рады видеть!"
      submitValue="Войти"
      question="Ещё не зарегистрированы?"
      link="Регистрация"
      linkTo="/signup"
    >
      <Input name="E-mail" type="email" />
      <Input name="Пароль" type="password" minlength="6" />
    </WelcomeForm>
  );
}

export default Login;

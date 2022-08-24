import './Register.css';
import WelcomeForm from '../WelcomeForm/WelcomeForm';
import Input from '../Input/Input';
function Register(props) {
  return (
    <WelcomeForm
      title="Добро пожаловать!"
      submitValue="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="Войти"
      linkTo="/signin"
    >
      <Input name="Имя" type="text" minlength="6" maxlength="30" />
      <Input name="E-mail" type="email" />
      <Input name="Пароль" type="password" minlength="6" />
    </WelcomeForm>
  );
}
export default Register;

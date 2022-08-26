import './WelcomeForm.css';
import headerLogo from '../../images/headerLogo.svg';
import Link from '../Link/Link';
function WelcomeForm(props) {
  return (
    <main className="welcomeform">
      <form className="welcomeform__form" onSubmit={props.onSubmit}>
        <div className="welcomeform__title-wrapper">
          <img className="welcomeform__logo" alt="логотип" src={headerLogo} />
          <h2 className="welcomeform__title">{props.title}</h2>
        </div>
        <div className="welcomeform__inputs-holder">{props.children}</div>
        <div className="welcomeform__bottom-wrapper">
          <input
            type="submit"
            className="welcomeform__submit-btn"
            value={props.submitValue}
            disabled={props.isLoading || !props.isValid}
          />
          <div className="welcomeform__bottom-text">
            <div className="welcomeform__bottom-question">{props.question}</div>
            <Link to={props.linkTo} className="welcomeform__bottom-link">
              {props.link}
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}

export default WelcomeForm;
// isLoading;

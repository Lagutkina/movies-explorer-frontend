import MainTitle from '../MainTitle/MainTitle';
import './AboutMe.css';
import aboutmePhoto from '../../images/aboutmePhoto.jpg';

function AboutMe() {
  return (
    <section id="aboutme" className="aboutme">
      <MainTitle title="Студент" />
      <div className="aboutme__profile-wrapper">
        <img className="aboutme__photo" src={aboutmePhoto} alt="фото профиля" />
        <div className="aboutme__profile">
          <h2 className="aboutme__name">Анастасия</h2>
          <div className="aboutme__info">
            <h3 className="aboutme__info-title">
              Фронтенд-разработчик, 32 года
            </h3>
            <p className="aboutme__description">
              Родилась и выросла в Москве, закончила психфак МГУ, вышла замуж и
              работала домохозяйкой. Варила борщи и стирала белье, протирала
              пыль и гладила простыни. Люблю смотреть сериалы и увлекаюсь
              вязанием. Потом захотела денег и начала кодить. В настоящее время
              ищу работу на фрилансе и продолжаю варить борщи. Пеку блины лучше,
              чем делаю адаптивные сайты, но все впереди.
            </p>
          </div>
          <ul className="aboutme__profile-links">
            <li className="aboutme__profile-link">
              <a
                className="aboutme__profile-link_item"
                href="http://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="aboutme__profile-link">
              <a
                className="aboutme__profile-link_item"
                href="http://github.com"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
export default AboutMe;

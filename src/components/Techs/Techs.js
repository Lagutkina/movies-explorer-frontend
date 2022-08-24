import MainTitle from '../MainTitle/MainTitle';
import './Techs.css';
function Techs() {
  return (
    <section id="techs" className="techs">
      <MainTitle title="Технологии" />
      <h2 className="tech__title">7 технологий</h2>
      <p className="tech__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="tech__list-wrapper">
        <ul className="tech__list">
          <li className="tech__item">HTML</li>
          <li className="tech__item">CSS</li>
          <li className="tech__item">JS</li>
          <li className="tech__item">React</li>
          <li className="tech__item">Git</li>
          <li className="tech__item">Express.js</li>
          <li className="tech__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
export default Techs;

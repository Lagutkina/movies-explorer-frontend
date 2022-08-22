import './AboutProject.css';
import MainTitle from '../MainTitle/MainTitle';
function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <MainTitle title="О проекте" />
      <div className="about-project__description">
        <div className="about-project__column">
          <h2 className=" about-project__column-title">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h2 className="about-project__column-title">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timebar">
        <div className="about-project__week about-project__week_black">
          <div className="about-project__week-header about-project__week-header_black">
            1 неделя
          </div>
          <p className="about-project__week-description">Back-end</p>
        </div>
        <div className="about-project__week">
          <div className="about-project__week-header">4 недели</div>
          <p className="about-project__week-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

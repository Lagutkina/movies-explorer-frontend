import './Profile.css';
function Profile() {
  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <div className="profile__info">
          <div className="profile__item">
            <div className="profile__item-name">Имя</div>
            <div className="profile__item-value">Виталий</div>
          </div>
          <div className="profile__item">
            <div className="profile__item-name">E-mail</div>
            <div className="profile__item-value">pochta@yandex.ru</div>
          </div>
        </div>
        <div className="profile__bottom">
          <p className="profile__bottom-link">Редактировать</p>
          <p className="profile__bottom-link profile__bottom-link_red">
            Выйти из аккаунта
          </p>
        </div>
      </div>
    </section>
  );
}
export default Profile;

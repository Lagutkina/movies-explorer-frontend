import './AccountButton.css';
import accountButtonIcon from '../../images/accountButtonIcon.svg';
import Link from '../Link/Link';
function AccountButton() {
  return (
    <Link to="/profile">
      <div className="account-btn">
        <p>Аккаунт</p>
        <div className="account-btn__iconframe">
          <img src={accountButtonIcon} alt="иконка" />
        </div>
      </div>
    </Link>
  );
}

export default AccountButton;

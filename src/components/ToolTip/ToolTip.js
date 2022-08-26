import './ToolTip.css';
import succes from '../../images/succesImg.svg';
import error from '../../images/errorImg.svg';

function ToolTip(props) {
  return (
    <div
      className={`tooltip ${props.err ? 'tooltip_open' : ''}`} //пропс isOpen ставится каждому попапу в апп
    >
      <div className="tooltip__container tooltip__container_type_tip">
        <button
          type="button"
          onClick={props.onClose}
          className="tooltip__close-btn"
        ></button>
        <img
          className="tooltip__status-pic"
          alt="успех"
          src={props.status === 'succes' ? succes : error}
        ></img>
        <div className="tooltip__status-message">{props.err}</div>{' '}
      </div>
    </div>
  );
}

export default ToolTip;

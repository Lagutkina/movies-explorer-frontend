import './ToolTip.css';
import succes from '../../images/succesImg.svg';
import error from '../../images/errorImg.svg';

function ToolTip(props) {
  return (
    <div
      className={`tooltip ${props.err || props.succes ? 'tooltip_open' : ''}`} //пропс isOpen ставится каждому попапу в апп
    >
      <div className="tooltip__container tooltip__container_type_tip">
        <button
          type="button"
          onClick={props.onClose}
          className="tooltip__close-btn"
        ></button>
        {(props.succes || props.err) && (
          <img
            className="tooltip__status-pic"
            alt="успех"
            src={props.succes ? succes : error}
          />
        )}
        <div className="tooltip__status-message">
          {props.err || props.succes}
        </div>{' '}
      </div>
    </div>
  );
}

export default ToolTip;

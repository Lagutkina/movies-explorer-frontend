import './Input.css';
function Input(props) {
  return (
    <div className="input__field">
      <label className="input__label">{props.name}</label>
      <input
        className={`input ${!!props.message ? 'input_error' : ''}`}
        type={props.type}
        name={props.name}
        required
      />
      {!!props.message && (
        <span className="input__message">{props.message}</span>
      )}
    </div>
  );
}
export default Input;

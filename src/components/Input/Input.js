import { useState } from 'react';
import './Input.css';
function Input(props) {
  const [value, setValue] = useState('');
  const [isValid, setValidity] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (evt) => {
    const input = evt.target;
    setValue(input.value);
    setValidity(input.validity.valid);
    if (!isValid) {
      setError(input.validationMessage);
    } else {
      setError('');
    }
  };

  return (
    <div className="input__field">
      <label className="input__label">{props.name}</label>
      <input
        className={`input ${!!error ? 'input_error' : ''}`}
        type={props.type}
        name={props.name}
        value={value}
        onChange={handleInputChange}
        minLength={props.minlength}
        maxLength={props.maxlength}
        required
      />
      {!!error && <span className="input__message">{error}</span>}
    </div>
  );
}
export default Input;

import { useState } from 'react';
import './Input.css';
function Input(props) {
  const [value, setValue] = useState(props.value);
  const [isValid, setValidity] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (evt) => {
    const input = evt.target;
    setValue(input.value);
    if (props.onChange) {
      props.onChange(evt);
    }
    if (props.isValid) {
      props.isValid(evt);
    }
    setValidity(input.validity.valid);
    if (!isValid) {
      setError(input.validationMessage);
    } else {
      setError('');
    }
  };

  return (
    <div className={props.readOnly ? 'input__field_readonly' : 'input__field'}>
      <label className={props.readOnly ? '' : 'input__label'}>
        {props.title}
      </label>
      <input
        className={`${props.readOnly ? 'input_readonly' : 'input'} ${
          !!error ? 'input_error' : ''
        }`}
        type={props.type}
        name={props.name}
        value={value}
        onChange={handleInputChange}
        minLength={props.minlength}
        maxLength={props.maxlength}
        pattern={props.pattern}
        required
        readOnly={props.readOnly}
      />
      {!!error && <span className="input__message">{error}</span>}
    </div>
  );
}
export default Input;

import { useState } from 'react';
export default function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  function handleChange(e) {
    const {
      name,
      value,
      validity: { valid },
      validationMessage,
    } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: { value, isValid: valid, error: validationMessage },
    }));
  }
  return { values, setValues, handleChange };
}

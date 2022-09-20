import AuthForm from './AuthForm';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
function Register({ onRegister }) {
  const initialFormValues = useMemo(
    () => ({
      email: {
        value: '',
        error: '',
        isValid: true,
      },
      password: {
        value: '',
        error: '',
        isValid: true,
      },
    }),
    []
  );
  const { values, handleChange } = useForm(initialFormValues);
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email: values.email.value, password: values.password.value });
  }
  return (
    <>
      <AuthForm
        name='registration'
        title='Регистрация'
        submitText='Зарегистрироваться'
        onSubmit={handleSubmit}
        isValid={
          values.email.isValid &&
          values.password.isValid &&
          values.email.value &&
          values.password.value
        }
      >
        <input
          className={`authorization__input ${
            !values.email.isValid && 'authorization__input_type_error'
          }`}
          type='email'
          name='email'
          placeholder='Email'
          id='registration-email'
          required
          onChange={handleChange}
          value={values.email.value}
        />
        <span
          className={`authorization__input-error ${
            !values.email.isValid && 'authorization__input-error_visible'
          }`}
        >
          {values.email.error}
        </span>
        <input
          className={`authorization__input ${
            !values.password.isValid && 'authorization__input_type_error'
          }`}
          type='password'
          name='password'
          placeholder='Пароль'
          id='registration-password'
          minLength='6'
          maxLength='20'
          required
          onChange={handleChange}
          value={values.password.value}
        />
        <span
          className={`authorization__input-error ${
            !values.password.isValid && 'authorization__input-error_visible'
          }`}
        >
          {values.password.error}
        </span>
      </AuthForm>
      <p className='registration__signin'>
        Уже зарегистрированы?{' '}
        <Link to='/sign-in' className='registration__login-link'>
          Войти
        </Link>
      </p>
    </>
  );
}
export default Register;

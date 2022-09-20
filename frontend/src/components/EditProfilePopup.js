import { useMemo, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
function EditProfilePopup({
  isOpen,
  onClose,
  onOverlay,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const initialFormValues = useMemo(
    () => ({
      name: {
        value: currentUser?.name,
        error: '',
        isValid: true,
      },
      about: {
        value: currentUser?.about,
        error: '',
        isValid: true,
      },
    }),
    [currentUser]
  );
  const { values, setValues, handleChange } = useForm(initialFormValues);
  useEffect(() => {
    setValues(initialFormValues);
  }, [isOpen, setValues, initialFormValues]);
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name.value,
      about: values.about.value,
    });
  }
  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonContent={!isLoading ? 'Сохранить' : 'Сохранение...'}
      onClose={onClose}
      isOpened={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={values.name.isValid && values.about.isValid}
      onOverlay={onOverlay}
    >
      <input
        className={`popup__input popup__input_type_name ${
          !values.name.isValid && 'popup__input_type_error'
        }`}
        type='text'
        name='name'
        required
        minLength='2'
        maxLength='40'
        id='name-input'
        placeholder='Имя'
        onChange={handleChange}
        value={values.name.value || ''}
      />
      <span
        className={`popup__error name-input-error ${
          !values.name.isValid && 'popup__error_visible'
        }`}
      >
        {values.name.error}
      </span>
      <input
        className={`popup__input popup__input_type_about ${
          !values.about.isValid && 'popup__input_type_error'
        }`}
        type='text'
        name='about'
        required
        minLength='2'
        maxLength='200'
        id='about-input'
        placeholder='О себе'
        onChange={handleChange}
        value={values.about.value || ''}
      />
      <span
        className={`popup__error about-input-error ${
          !values.about.isValid && 'popup__error_visible'
        }`}
      >
        {values.about.error}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;

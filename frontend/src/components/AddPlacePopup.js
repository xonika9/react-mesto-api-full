import { useMemo, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';
function AddPlacePopup({ isOpen, onClose, onOverlay, onAddPlace, isLoading }) {
  const initialFormValues = useMemo(
    () => ({
      title: {
        value: '',
        error: '',
        isValid: true,
      },
      link: {
        value: '',
        error: '',
        isValid: true,
      },
    }),
    []
  );
  const { values, setValues, handleChange } = useForm(initialFormValues);
  useEffect(() => {
    setValues(initialFormValues);
  }, [isOpen, setValues, initialFormValues]);
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title: values.title.value, link: values.link.value });
  }
  return (
    <PopupWithForm
      name='add-element'
      title='Новое место'
      buttonContent={!isLoading ? 'Создать' : 'Сохранение...'}
      onClose={onClose}
      isOpened={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={
        values.title.isValid &&
        values.link.isValid &&
        values.title.value &&
        values.link.value
      }
      onOverlay={onOverlay}
    >
      <input
        className={`popup__input popup__input_type_card-title ${
          !values.title.isValid && 'popup__input_type_error'
        }`}
        type='text'
        name='title'
        placeholder='Название'
        required
        minLength='2'
        maxLength='30'
        id='title-input'
        onChange={handleChange}
        value={values.title.value}
      />
      <span
        className={`popup__error title-input-error ${
          !values.title.isValid && 'popup__error_visible'
        }`}
      >
        {values.title.error}
      </span>
      <input
        className={`popup__input popup__input_type_image-link ${
          !values.link.isValid && 'popup__input_type_error'
        }`}
        type='url'
        name='link'
        placeholder='Ссылка на картинку'
        required
        id='link-input'
        onChange={handleChange}
        value={values.link.value}
      />
      <span
        className={`popup__error link-input-error ${
          !values.link.isValid && 'popup__error_visible'
        }`}
      >
        {values.link.error}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;

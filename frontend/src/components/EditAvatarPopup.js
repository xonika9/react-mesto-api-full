import { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup({
  isOpen,
  onClose,
  onOverlay,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = useRef();
  const [isInputValid, setIsInputValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }
  function checkValidity(e) {
    if (e.target.validity.valid) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
      setErrorMessage(e.target.validationMessage);
    }
  }
  useEffect(() => {
    avatarRef.current.value = '';
    setIsInputValid(true);
    setErrorMessage('');
  }, [isOpen]);
  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonContent={!isLoading ? 'Сохранить' : 'Сохранение...'}
      onClose={onClose}
      isOpened={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isInputValid}
      onOverlay={onOverlay}
    >
      <input
        className={`popup__input popup__input_type_avatar-link ${
          !isInputValid && 'popup__input_type_error'
        }`}
        type='url'
        name='avatar'
        required
        placeholder='Ссылка на изображение'
        id='avatar-input'
        ref={avatarRef}
        onChange={checkValidity}
      />
      <span
        className={`popup__error avatar-input-error ${
          !isInputValid && 'popup__error_visible'
        }`}
      >
        {errorMessage}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;

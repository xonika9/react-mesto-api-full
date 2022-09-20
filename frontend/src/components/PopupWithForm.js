function PopupWithForm({
  name,
  title,
  acceptMessage,
  children,
  isOpened,
  onClose,
  onOverlay,
  onSubmit,
  buttonContent,
  isValid,
}) {
  return (
    <div
      className={`popup popup_type_${name}${
        isOpened ? ' popup_is-opened' : ''
      }`}
      onClick={onOverlay}
    >
      <div className='popup__content'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <h2 className='popup__title'>{title}</h2>
        <form
          className='popup__form'
          name={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__submit-button ${
              !isValid && 'popup__submit-button_disabled'
            }`}
            type='submit'
            disabled={!isValid}
            aria-label={acceptMessage}
          >
            {buttonContent}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;

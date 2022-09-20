function InfoTooltip({ message, onClose, onOverlay }) {
  return (
    <div
      className={`popup popup_type_info ${message && 'popup_is-opened'} `}
      onClick={onOverlay}
    >
      <div className='popup__content popup__content_info'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <img className='popup__icon' src={message?.icon} alt={message?.text} />
        <h2 className='popup__title popup__title_place_tooltip'>
          {message?.text}
        </h2>
      </div>
    </div>
  );
}
export default InfoTooltip;

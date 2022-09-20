function ImagePopup({ card, onClose, onOverlay }) {
  return (
    <div
      className={`popup popup_type_image${card.src ? ' popup_is-opened' : ''}`}
      onClick={onOverlay}
    >
      <div className='popup__content popup__content_image'>
        <button
          className='popup__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <figure className='popup__figure'>
          <img className='popup__image' src={card.src} alt={card.title} />
          <figcaption className='popup__caption'>{card.title}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default ImagePopup;

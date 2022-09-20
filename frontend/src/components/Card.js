import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__remove${
    isOwn ? '' : ' card__remove_disabled'
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? 'card__like_active' : ''
  }`;
  function handleClick() {
    onCardClick({ src: card.link, title: card.name });
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card._id);
  }
  return (
    <div className='card'>
      <img
        className='card__photo'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type='button'
        aria-label='Удалить'
        onClick={handleDeleteClick}
      />
      <div className='card__caption'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__like-group'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Нравится'
            onClick={handleLikeClick}
          />
          <span className='card__like-counter'>{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
export default Card;

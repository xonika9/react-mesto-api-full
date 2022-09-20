import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';
function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = cards.map((item) => {
    return (
      <li key={item._id}>
        <Card
          card={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      </li>
    );
  });
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__info'>
          <a
            className='profile__avatar'
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            href='#'
            onClick={onEditAvatar}
          ></a>
          <div className='profile__text'>
            <div className='profile__title'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                className='profile__edit-button'
                type='button'
                aria-label='Редактировать'
                onClick={onEditProfile}
              />
            </div>
            <p className='profile__about'>{currentUser.about}</p>
          </div>
        </div>
        <button
          className='profile__add-button'
          type='button'
          aria-label='Добавить'
          onClick={onAddPlace}
        />
      </section>
      <ul className='elements'>{cardsElements}</ul>
    </main>
  );
}
export default Main;

import { useState, useEffect, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import CurrentUserContext from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth.js';
import api from '../utils/api';
import successIcon from '../images/successful.svg';
import failIcon from '../images/failed.svg';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationMessage, setRegisterMessage] = useState(null);
  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user.data);
        history.push('./');
      })
      .catch((err) => {
        setLoggedIn(false);
        history.push('./signin');
        console.log(`Первый: ${err}`);
      });
  }, [history]);
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user.data);
          setCards(cards.data);
        })
        .catch((err) => {
          console.log(`Второй: ${err}`);
          setLoggedIn(false);
          history.push('/signin');
        });
    }
  }, [loggedIn]);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setCardToDelete(null);
    setRegisterMessage(null);
  };
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  };
  const isOpened =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    selectedCard;
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isOpened) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, [isOpened]);
  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .setAvatar({ avatar })
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleAddPlaceSubmit = ({ title, link }) => {
    setIsLoading(true);
    api
      .addCard({ title, link })
      .then((newCard) => {
        setCards([...cards, newCard.data]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleCardDelete = (cardId) => setCardToDelete(cardId);

  const handleConfirmDeletion = (cardId) => {
    setIsLoading(true);
    api
      .removeCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const handleCardClick = ({ src, title }) => setSelectedCard({ src, title });
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c)),
        );
      })
      .catch((err) => console.log(err));
  };
  function handleRegister({ email, password }) {
    auth
      .registration({ email, password })
      .then((res) => {
        setRegisterMessage({
          icon: successIcon,
          text: 'Вы успешно зарегистрировались!',
        });
        history.push('/sign-in');
      })
      .catch((err) => {
        setRegisterMessage({
          icon: failIcon,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.log(err);
      });
  }
  function handleLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then((user) => {
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        setRegisterMessage({
          icon: failIcon,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.log(err);
      });
  }
  function handleLogout() {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        history.push('/sign-in');
      })
      .catch((err) => console.log(err));
  }
  const checkToken = useCallback(() => {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/');
        } else {
          setLoggedIn(false);
          history.push('/sign-in');
        }
      })
      .catch((err) => console.log(err));
  }, [history]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={currentUser?.email} onLogout={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOverlay={handleOverlayClick}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOverlay={handleOverlayClick}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOverlay={handleOverlayClick}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmationPopup
            card={cardToDelete}
            onClose={closeAllPopups}
            onOverlay={handleOverlayClick}
            onConfirmDeletion={handleConfirmDeletion}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlay={handleOverlayClick}
          />
          <InfoTooltip
            message={registrationMessage}
            onClose={closeAllPopups}
            onOverlay={handleOverlayClick}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;

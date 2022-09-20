class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
  setAvatar = (formValues) => {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: formValues.avatar }),
    }).then(this._checkResponse);
  };
  getUserInfo = () => {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  };
  setUserInfo = (profileInfo) => {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(profileInfo),
    }).then(this._checkResponse);
  };
  getInitialCards = () => {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  };
  addCard = (formValues) => {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: formValues.title, link: formValues.link }),
    }).then(this._checkResponse);
  };
  removeCard = (cardId) => {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  };
  toggleLike = (cardId, isLiked) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
    }).then(this._checkResponse);
  };
}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {
    authorization: '3561314d-9c6f-4e96-b81e-d301e13da90c',
    'Content-Type': 'application/json',
  },
});
//changes
export default api;

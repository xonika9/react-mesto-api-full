class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };
  setAvatar = (formValues) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar: formValues.avatar }),
    }).then(this._checkResponse);
  };
  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };
  setUserInfo = (profileInfo) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(profileInfo),
    }).then(this._checkResponse);
  };
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };
  addCard = (formValues) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name: formValues.title, link: formValues.link }),
    }).then(this._checkResponse);
  };
  removeCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };
  toggleLike = (cardId, isLiked) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };
}
const api = new Api({
  baseUrl: 'http://api.mesto.xonika.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

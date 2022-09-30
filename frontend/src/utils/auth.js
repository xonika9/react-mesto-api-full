const baseUrl = 'https://api.x9-mesto.nomoredomains.sbs';
const headers = { 'Content-Type': 'application/json' };
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}
export function registration({ email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}
export function authorize({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}
export function logout() {
  return fetch(`${baseUrl}/logout`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
}
export function checkToken() {
  return fetch(`${baseUrl}/checktoken`, {
    method: 'GET',
    headers,
    credentials: 'include',
  }).then((res) => checkResponse(res));
}

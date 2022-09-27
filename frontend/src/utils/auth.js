const baseUrl = 'http://localhost:4000';
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
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
}
export function getContent(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
}

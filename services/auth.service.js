//const urlServer = 'http://localhost:3000';
//const urlServer = 'https://my-json-server.typicode.com/wilmerortiz/api-json-server';
//const urlServer = 'https://62d2e09981cb1ecafa67445b.mockapi.io/api/v1';
const urlServer = 'https://apifake-json-server.herokuapp.com';

const getUsers = async () => {
  const res = await fetch(urlServer + '/users');
  const data = await res.json();
  return data;
}

const getUser = async (id) => {
  const res = await fetch(urlServer + '/users/' + id);
  const data = await res.json();
  return data;
}

const auth = async (email, password) => {
  const res = await fetch(`${urlServer}/users?email=${email}&password=${password}`);
  const data = await res.json();
  return data;
}

const register = async (user) => {
  const res = await fetch(urlServer + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  return data;
}

const editUser = async (user) => {
  const res = await fetch(urlServer + '/users/' + user.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  return data;
}

export const authService = {
  getUsers,
  auth,
  getUser,
  register,
  editUser
}

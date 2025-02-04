// CRUD users

export type User = {
  name?: string;
  zipcode?: number;
  _id?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

// const apiBase = 'https://codesandbox.io/auth/preview?preview_url=https://9vtgwg-8080.csb.app/users/&shortid=9vtgwg'
const apiBase = 'http://localhost:8080';
// const headers = new Headers();
// headers.append("Content-Type", "application/json");

const getUsers = async () => {
  const response = await fetch(`${apiBase}/users/`);
  return response.json();
};

const getUserById = async (id: string) => {
  const response = await fetch(`${apiBase}/users/${id}`);
  return response.json();
};

const createUser = async (user: User) => {
  const response = await fetch(`${apiBase}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

const updateUser = async (id: string, user: User) => {
  const response = await fetch(`${apiBase}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

const deleteUser = async (id: string) => {
  const response = await fetch(`${apiBase}/users/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
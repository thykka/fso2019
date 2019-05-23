import axios from 'axios'
const API_URL = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(API_URL);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(API_URL, newObject);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${API_URL}/${id}`, newObject);
  return request.then(response => response.data);
};

export default { getAll, create, update };


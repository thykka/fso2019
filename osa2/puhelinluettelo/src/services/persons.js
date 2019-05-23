import axios from 'axios'
const API_URL = 'http://localhost:3001/persons'

const getList = () => {
  const request = axios.get(API_URL);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(API_URL, newObject);
  return request.then(response => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${API_URL}/${id}`);
  return request.then(response => response.data);
}

export default {
  getList, create, remove
};

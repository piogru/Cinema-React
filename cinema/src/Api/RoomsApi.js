import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:7777/';

export const getAllRooms = () => {
  return axios.get('rooms')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

export const getRoom = (id) => {
  return axios.get('rooms/' + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

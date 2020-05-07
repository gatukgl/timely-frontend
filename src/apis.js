import axios from 'axios'

const BASE_URL = 'http://localhost:8000'
export const getTasks = () => {
  return axios.get(`${BASE_URL}/tasks`).then((response) => response.data)
}

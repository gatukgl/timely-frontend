import axios from 'axios'

const BASE_URL = 'http://localhost:8000'
export const getTasks = () => {
  return axios.get(`${BASE_URL}/tasks`).then((response) => response.data)
}

export const createTask = (payload) => {
  return axios.post(`${BASE_URL}/tasks`, payload).then((response) => response.data)
}

export const removeTask = (taskId) => {
  return axios.delete(`${BASE_URL}/tasks/${taskId}`)
}

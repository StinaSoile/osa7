import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.get(baseUrl, config)

  return response.data
}

const createBlog = async (newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data
};

const likeBlog = async (id, newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, createBlog, likeBlog, deleteBlog }
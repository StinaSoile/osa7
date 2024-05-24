import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'


const getAll = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.get(baseUrl, config)

  return response.data
}

export default { getAll }
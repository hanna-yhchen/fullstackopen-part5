import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

function setToken(newToken) {
  token = newToken
}

async function getAll() {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { getAll, setToken }

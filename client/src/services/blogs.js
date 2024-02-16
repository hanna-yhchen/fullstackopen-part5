import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

async function getAll() {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

async function create(newBlog) {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken }

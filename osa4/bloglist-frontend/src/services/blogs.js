import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const like = async changedObject => {
  const response = await axios.put(`/api/blogs/${changedObject.id}`,changedObject)
  console.log('trying to like', response.data)
  return { ...changedObject, likes: changedObject.likes + 1 }
}
const remove = async id => {
  console.log('id in axios', id.id)
  console.log('came to axios part!')
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id.id}`, config)
  return response.data
}
export default { getAll, setToken, create, like, remove }
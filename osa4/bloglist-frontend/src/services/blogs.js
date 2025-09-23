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
  console.log(changedObject)
  const response = await axios.put(`/api/blogs/${changedObject.id}`,changedObject)
  // console.log('trying to like', response.data)
  console.log("response:", response)
  return {...changedObject, likes: changedObject.likes + 1}
}

export default { getAll, setToken, create, like }
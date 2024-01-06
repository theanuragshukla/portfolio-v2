import axios from 'axios'

const client = axios.create({
  baseURL:process.env.REACT_APP_SERVER_URL || "http://localhost:8000",
  withCredentials:true
})

export default client

import axios from 'axios'

const client = axios.create({
  baseURL:process.env.REACT_APP_SERVER_URL || "https://portserver.anurags.dev",
  withCredentials:true
})

export default client

import axios from "axios"

const API = "https://health-ai-backend-production-eafd.up.railway.app/api/auth"

export async function login(data){

  const res = await axios.post(`${API}/login`, data)

  localStorage.setItem("token", res.data.token)

  return res.data
}

export async function register(data){

  const res = await axios.post(`${API}/register`, data)

  return res.data
}

export function logout(){

  localStorage.removeItem("token")

}
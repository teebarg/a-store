import axios from 'axios'

const HTTP = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
})

// Alter defaults after http has been created
HTTP.defaults.headers.post['Content-Type'] = 'application/json'
HTTP.defaults.withCredentials = true

export default HTTP

export const API_GRAPHQL = process.env.NEXT_PUBLIC_API_GRAPHQL

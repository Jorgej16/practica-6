import axios from 'axios';
const destino = "http://localhost";
const port = "1337";
export default {

  async create(data) {
    let response = await axios.post(`${destino}:${port}/`, data)

    return response;
  },
  async getData() {
    let response = await axios.get(`${destino}:${port}/`)

    return response;
  },
}
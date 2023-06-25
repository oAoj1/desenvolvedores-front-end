import axios from "axios";

const Api = axios.create({
    baseURL: 'https://desenvolvedores-back-end-production.up.railway.app'
})

export default Api
import axios from "axios";


const API = axios.create({ baseURL: "https://reciclo.api-reciclo.free.nf/api/v1" });

export { API };

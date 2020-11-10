import axios from "axios";
import createHttp from "./create";

const cancelToken = axios.CancelToken;

const http=createHttp();
export {createHttp,cancelToken};
export default http;
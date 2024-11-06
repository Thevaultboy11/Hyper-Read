import axios from "axios";

const instace = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACK_END_PATH,
  timeout: 6000,
});
//Bearer ${window.localStorage.getItem('cookie')}
//eror handeling ako izbaci error da vrati promise
export default instace;

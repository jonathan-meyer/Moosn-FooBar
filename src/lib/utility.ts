import axios from "axios";

export const helloWorld = (name: string) =>
  axios.get(`http://postman-echo.com/get`, { params: { hello: name } });

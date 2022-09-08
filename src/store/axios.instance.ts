import axios from "axios";

// const $axios = axios.create({
//   baseURL: "https://jedlik-expr-mongoose-backend.herokuapp.com/",
//   withCredentials: true,
// });

const $axios = axios.create({
  baseURL: "https://jedlik-backend.cyclic.app/",
  withCredentials: true,
});

export default $axios;

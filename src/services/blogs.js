import axios from "axios";
const blogBaseUrl = "/api/blogs";
const loginBaseUrl = "/api/login";

let token = null;
const getAll = () => {
   const request = axios.get(blogBaseUrl);
   return request.then((response) => response.data);
};

const login = async (credentials) => {
   const response = await axios.post(loginBaseUrl, credentials);
   return response.data;
};

const setToken = (userToken) => {
   token = userToken;};
const getConfig = () => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   return config;
};
const createBlog = async (blogData) => {
   const response = await axios.post(blogBaseUrl, blogData, getConfig());
   return response.data;
};

export default { getAll, login, setToken, createBlog };

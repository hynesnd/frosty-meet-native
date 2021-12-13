import axios from "axios";
const frostyApi = axios.create({
  baseURL: "https://frosty-api2.herokuapp.com/api",
});

export const getEvents = (token) => {
  return frostyApi.get("/events", { headers: { "x-auth-token": token } });
};
export const getUsers = () => {
  return frostyApi.get("/users");
};
export const getUser = (id) => {
  return frostyApi.get(`/users/${id}`);
};
export const getCategories = () => {
  return frostyApi.get("/categories");
};
export const getParks = () => {
  return frostyApi.get("/parks");
};
export const getComments = (id) => {
  return frostyApi.get(`/events/${id}/comments`);
};
export const postComment = (id) => {
  //
};
export const postNewUser = (newUser) => {
  return frostyApi.post("/users/register", newUser);
};

export const loginUser = (newUser) => {
  return frostyApi.post("/users/login", newUser);
};

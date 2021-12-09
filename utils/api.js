import axios from "axios";
const frostyApi = axios.create({
  baseURL: "https://frostyapi.herokuapp.com/api",
});

export const getEvents = () => {
  return frostyApi.get("/events");
};
export const getUsers = () => {
  return frostyApi.get("/users");
};
export const getCategories = () => {
  return frostyApi.get("/categories");
};
export const getParks = () => {
  return frostyApi.get("/parks");
};

import axios from "axios";
const frostyApi = axios.create({
  baseURL: "https://frosty-api2.herokuapp.com/api",
});

export const getUserByUsername = (username) => {
  return frostyApi.get(`/users/${username}`);
};

export const deleteEvent = (id) => {
  return frostyApi.delete(`/events/${id}/`);
};

export const getHistory = (title) => {
  return frostyApi.get(`/chat/${title}`);
};

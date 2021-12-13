import axios from "axios";
const frostyApi = axios.create({
  baseURL: "https://frostyapi.herokuapp.com/api",
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

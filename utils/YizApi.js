import axios from "axios";
const frostyApi = axios.create({
  baseURL: "https://frostyapi.herokuapp.com/api",
});

export const getUserByUsername = (username) => {
  return frostyApi.get(`/users/${id}`);
};

export const getParticipants = (id) => {
  return frostyApi.get(`/events/${id}/participants`);
};

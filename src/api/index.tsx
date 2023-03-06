import axios from "axios";

export const getUsers = () =>
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(({ data }) => data);

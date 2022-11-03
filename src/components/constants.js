export const API = "http://localhost:5000";

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authConfig = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": localStorage.getItem("token"),
  },
};

import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://s-task-management.vercel.app/api/v1",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

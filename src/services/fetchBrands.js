import axios from "axios";

export const fetchBrands = async () => {
  const res = await axios.get("/brands");
  return res.data;
};
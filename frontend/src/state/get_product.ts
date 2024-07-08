import axios from "axios";
import { BACKEND_URL } from "../config";

async function getProducts() {
  try {
    const response = await axios.get(`${BACKEND_URL}/products`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getProducts;

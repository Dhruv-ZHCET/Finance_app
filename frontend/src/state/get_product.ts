import axios from "axios";

async function getProducts() {
  try {
    const response = await axios.get(
      "https://backend.haqueinsham.workers.dev/products"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getProducts;

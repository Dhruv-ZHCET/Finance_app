import axios from "axios";

async function getTransaction() {
  try {
    const response = await axios.get(
      "https://backend.haqueinsham.workers.dev/transactions"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getTransaction;

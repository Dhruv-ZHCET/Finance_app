import axios from "axios";

async function getKpi() {
  try {
    const response = await axios.get(
      "https://backend.haqueinsham.workers.dev/kpi"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getKpi;

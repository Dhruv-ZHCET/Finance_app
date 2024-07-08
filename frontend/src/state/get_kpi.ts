import axios from "axios";
import { BACKEND_URL } from "../config";
async function getKpi() {
  try {
    const response = await axios.get(`${BACKEND_URL}/kpi`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default getKpi;

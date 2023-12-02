import axios from "axios";
import carData from "./data";

const baseURL = "http://saxbomb.pythonanywhere.com";
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendData = async ({ formData, odometer, year }) => {
  try {
    // Convert selected option values to their respective indices
    const formDataWithIndices = Object.keys(formData).reduce((acc, key) => {
      const optionIndex = carData[key].indexOf(formData[key]);
      acc[key] = optionIndex;
      return acc;
    }, {});
    console.log(formDataWithIndices, year, odometer);
    const response = await api.post("/predict", {
      ...formDataWithIndices,
      odometer,
      year,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data to backend:", error.message);
    throw error;
  }
};

import React, { useState } from "react";
import carData from "./data";
import { sendData } from "./api";
import "./app.css";

const CarForm = () => {
  const [predPrice, setPredPrice] = useState(null);
  const [odometer, setOdometer] = useState("");
  const [year, setYear] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    manufacturer: "",
    condition: "",
    cylinders: "",
    fuel: "",
    transmission: "",
    drive: "",
    type: "",
    paint_color: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await sendData({
        formData: selectedOptions,
        odometer,
        year,
      });
      setPredPrice(responseData.prediction); // response data will contain the predicted price, set the predicted price
      console.log("Response from the backend:", responseData);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };
  if (predPrice !== null ) {
    console.log("predPrice", predPrice);
    return (
      <div className="predicted-price">
        <h1>Predicted price for your car: ${predPrice}</h1>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="heading">Prediction Model</h2>
      {Object.keys(selectedOptions).map((option) => (
        <div key={option}>
          <label htmlFor={option}>{option}</label>
          <select
            id={option}
            name={option}
            value={selectedOptions[option]}
            onChange={handleChange}
          >
            <option value="">Select {option}</option>
            {carData[option].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
      <label htmlFor="odometer">Odometer</label>
      <input
        type="text"
        id="odometer"
        name="odometer"
        placeholder="Odometer Reading"
        value={odometer}
        onChange={(e) => setOdometer(e.target.value)}
      />

      <label htmlFor="year">Year</label>
      <input
        type="text"
        id="year"
        name="year"
        placeholder="Model Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button type="submit">Predict</button>
    </form>
  );
};

export default CarForm;

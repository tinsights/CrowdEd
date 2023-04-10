import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [addressQuery, setAddressQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function onFormChange(e) {
    setAddressQuery(e.target.value);
  }

  function askOneMap() {
    axios
      .get(`https://developers.onemap.sg/commonapi/search?searchVal=${addressQuery}&returnGeom=Y&getAddrDetails=Y`)
      .then((response) => {
        console.log(response.data.results);
        setLocation(response.data.results[0]);
        return [response.data.results[0].LATITUDE, response.data.results[0].LONGITUDE];
      })
      .then((coordinates) => {
        console.log(coordinates);
        navigate(`/map/${coordinates[0]}/${coordinates[1]}`);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="container-fluid d-flex align-items-center" id="hero">
        <div className="container-md">
          <div className="input-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Where will you learn today?"
              value={addressQuery}
              onChange={(e) => onFormChange(e)}
            />
            <button
              className="btn btn-outline-secondary bg-light opacity-50"
              type="button"
              id="button-addon2"
              onClick={askOneMap}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

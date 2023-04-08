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
      <h1>Home</h1>
      {/* search bar for postal code or address that queries the onemap API*/}
      <input type="text" placeholder="Search for your address" value={addressQuery} onChange={(e) => onFormChange(e)} />
      {/* button to search for postal code or address */}
      <button onClick={askOneMap}>Search</button>
    </>
  );
}

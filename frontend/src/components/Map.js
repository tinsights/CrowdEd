import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Map() {
  const [skills, setSkills] = useState([]);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    Promise.all[(axios.get("/api/skills"), axios.get("/api/skills/requests"))].then((response) => {
      console.log(response.data);
      setSkills(response.data[0]);
      setRequests(response.data[1]);
    });
  }, []); // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.
  return (
    <MapContainer id="map-container" center={[1.3521, 103.8198]} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {skills.map((s) => (
        <Marker position={[s.location.LATITUDE, s.location.LONGITUDE]} key={s._id}>
          <Popup>
            <h6>{s.title}</h6>
            <p>{s.description}</p>
            <p>
              {s.location.LATITUDE} , {s.location.LONGITUDE}
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

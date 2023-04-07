import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Map() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  // const [requests, setRequests] = useState([]);
  useEffect(() => {
    axios.get("/api/skills").then((response) => {
      console.log(response.data);
      setSkills(response.data);
    });
  }, []);
  function goToSkill(id) {
    return () => navigate(`/skills/${id}`);
  }
  return (
    <MapContainer id="map-container" center={[1.3521, 103.8198]} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {skills?.map((s) => (
        <Marker onClick={goToSkill(s._id)} position={[s.location.LATITUDE, s.location.LONGITUDE]} key={s._id}>
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

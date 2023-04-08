import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Map() {
  const params = useParams();
  console.log(params);
  const isParamsEmpty = Object.keys(params).length === 0;
  const center = isParamsEmpty ? [1.3521, 103.8198] : [params.lat, params.lng];
  console.log(center);
  const zoom = isParamsEmpty ? 12 : 15;
  console.log(zoom);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    Promise.all([axios.get("/api/skills"), axios.get("/api/requests")]).then((response) => {
      setSkills(response[0].data);
      setRequests(response[1].data);
    });
  }, []);
  function goToSkill(userId, skillId) {
    return () => navigate(`/users/${userId}/skills/${skillId}`);
  }
  return (
    <MapContainer id="map-container" center={center} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Skills">
          {skills?.map((u) => (
            <Marker position={[u.location.LATITUDE, u.location.LONGITUDE]} key={u._id}>
              <Popup>
                <h3 onClick={() => navigate(`/users/${u._id}`)}>{u.username}</h3>
                <p>Skills:</p>
                <ol>
                  {u.skills?.map((s) => (
                    <React.Fragment key={s._id}>
                      <li onClick={goToSkill(u._id, s._id)}>{s.title}</li>
                    </React.Fragment>
                  ))}
                </ol>
              </Popup>
            </Marker>
          ))}
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Requests">
          {requests?.map((u) => (
            <Marker position={[u.location.LATITUDE, u.location.LONGITUDE]} key={u._id}>
              <Popup>
                <h3 onClick={() => navigate(`/users/${u._id}`)}>{u.username}</h3>
              </Popup>
            </Marker>
          ))}
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap
} from 'react-google-maps';
import Geocode from "react-geocode";

export default function Maps(props) {

  const [mylat, setMylat] = useState(32.078120);
  const [mylng, setMylng] = useState(34.847020);

  useEffect(() => {
    const { location } = props;
    console.log("use eff loc : "+ location)
    Geocode.setApiKey("AIzaSyBN1iwWntz7dFD2JW4Y3UJmYiweGeQ5VGE");

    Geocode.fromAddress(location).then(
        response => {
            var center = response.results[0].geometry.location;
            setMylat(center.lat);
            setMylng(center.lng);
        },
        error => {
            console.log("failed");
            console.error(error);
        }
    );
  }, []);

  const Map = () => {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: mylat, lng: mylng }}
        zoom={20}
      >
      </GoogleMap>
    );
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBN1iwWntz7dFD2JW4Y3UJmYiweGeQ5VGE`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
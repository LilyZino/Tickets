import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap
} from 'react-google-maps';
import Geocode from "react-geocode";

var mylat = 32.078120;
var mylng = 34.847020;
function Map() {
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
function setlat(lat) {
    mylat = lat;
}
function setlng(lng) {
    mylng = lng;
}
function getlatlng(loc) {
    Geocode.setApiKey("AIzaSyBN1iwWntz7dFD2JW4Y3UJmYiweGeQ5VGE");
    Geocode.enableDebug();

    Geocode.fromAddress(loc).then(
        response => {
            //var { newlat, newlng } = response.results[0].geometry.location;
            //console.log(response.results[0].geometry.location);
            console.log("new");
            var center = response.results[0].geometry.location;
            var newlat = center.lat;
            console.log(newlat);
            var newlng = center.lng;
            console.log(newlng);

            setlat(newlat);
            setlng(newlng);
            console.log("setted");
            console.log(mylat);
            console.log(mylng);
        },
        error => {
            console.log("failed");
            console.error(error);
        }
    );
}

export default function Maps(props) {
    const { location } = props;
    getlatlng(location);
    
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
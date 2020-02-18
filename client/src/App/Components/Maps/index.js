import React, { useState, useEffect } from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap
} from 'react-google-maps';
import Geocode from 'react-geocode';
import { GoogleKey } from '../../../../../secrets';

export default function Maps(props) {
    const [mylat, setMylat] = useState(32.078120);
    const [mylng, setMylng] = useState(34.847020);

    useEffect(() => {
        const { location } = props;
        console.log(`use eff loc : ${location}`);
        Geocode.setApiKey(GoogleKey);

        Geocode.fromAddress(location).then(
            (response) => {
                const center = response.results[0].geometry.location;
                setMylat(center.lat);
                setMylng(center.lng);
            },
            (error) => {
                console.log('failed');
                console.error(error);
            }
        );
    }, [props]);

    const Map = () => {
        return (
            <GoogleMap
                defaultZoom={18}
                defaultCenter={{ lat: mylat, lng: mylng }}
                zoom={18}
            />
        );
    };
    const MapWrapped = withScriptjs(withGoogleMap(Map));
    return (
        <div style={{ height: '100vh' }}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GoogleKey}`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}
            />
        </div>
    );
}
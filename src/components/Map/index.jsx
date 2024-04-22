"use client"

import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import styles from './index.module.scss';
import CustomMarker from '../CustomMarker';
import CheckBox from '../CheckBox';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  styles: [

    {
      featureType: "all",
      stylers: [{ visibility: "on" }]
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ societiesListSocieties }) => {
  const [selectedSocietiesData, setSelectedSocietiesData] = useState([]);

  const dataContentDetails = []



  const center = {
    lat: 24.470901,
    lng: 39.612236,
  };

  const calculateMapCenter = (data) => {
    if (!data.length) return { lat: 24.774265, lng: 46.738586 };
    const totalLocations = data.length;
    const latLngSum = data.reduce((acc, curr) => ({
      lat: acc.lat + parseFloat(curr.lat),
      lng: acc.lng + parseFloat(curr.long),
    }), { lat: 0, lng: 0 });

    return {
      lat: latLngSum.lat / totalLocations,
      lng: latLngSum.lng / totalLocations
    };
  };

  const calculateZoomLevel = (data) => {
    if (data.length === 1) return 15;
    if (data.length < 3) return 10;
    if (data.length > 10) return 6;
    return 6;
  };

  const mapCenter = useMemo(() => calculateMapCenter(selectedSocietiesData), [selectedSocietiesData]);
  const zoomLevel = useMemo(() => calculateZoomLevel(selectedSocietiesData), [selectedSocietiesData]);



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0',
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading Maps...</div>;

  console.log(zoomLevel, "zoomLevel")
  console.log(selectedSocietiesData.l, "zoomLevel")

  return (
    <>
      <CheckBox
        societiesListSocieties={societiesListSocieties}
        selectedSocietiesData={selectedSocietiesData}
        setSelectedSocietiesData={setSelectedSocietiesData}
      />
      <div className={styles.map_container}>
        <div
          className={styles.map}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={zoomLevel}
            options={options}
          >
            {selectedSocietiesData.map(society => (
              <OverlayView
                key={society.id}
                position={{ lat: parseFloat(society.lat), lng: parseFloat(society.long) }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="societie">
                  <div className="RoundedMarkIcon">
                    <CustomMarker center={center} imageUrl={'/place.jpeg'} />
                  </div>
                  <div className="markName">
                    <p>{society.name}</p>
                  </div>
                </div>
              </OverlayView>
            ))}

          </GoogleMap>
        </div>
      </div >
    </>
  );
};

export default Map;
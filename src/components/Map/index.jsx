// "use client"

// import React, { useMemo, useState } from 'react';
// import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
// import styles from './index.module.scss';
// import CustomMarker from '../CustomMarker';
// import CheckBox from '../CheckBox';

// const mapContainerStyle = {
//   width: '100%',
//   height: '100%',
// };

// const options = {
//   styles: [

//     {
//       featureType: "all",
//       stylers: [{ visibility: "on" }]
//     },
//   ],
//   disableDefaultUI: true,
//   zoomControl: true,
// };

// const Map = ({ societiesListSocieties }) => {
//   const [selectedSocietiesData, setSelectedSocietiesData] = useState([]);

//   const center = {
//     lat: 24.470901,
//     lng: 39.612236,
//   };

//   const calculateMapCenter = (data) => {
//     if (!data.length) return { lat: 24.774265, lng: 46.738586 };
//     const totalLocations = data.length;
//     const latLngSum = data.reduce((acc, curr) => ({
//       lat: acc.lat + parseFloat(curr.lat),
//       lng: acc.lng + parseFloat(curr.long),
//     }), { lat: 0, lng: 0 });

//     return {
//       lat: latLngSum.lat / totalLocations,
//       lng: latLngSum.lng / totalLocations
//     };
//   };

//   const calculateZoomLevel = (data) => {
//     if (data.length === 1) return 15;
//     if (data.length < 3) return 10;
//     if (data.length > 10) return 6;
//     return 6;
//   };

//   const mapCenter = useMemo(() => calculateMapCenter(selectedSocietiesData), [selectedSocietiesData]);
//   const zoomLevel = useMemo(() => calculateZoomLevel(selectedSocietiesData), [selectedSocietiesData]);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0',
//     libraries: ["places"],
//   });

//   if (!isLoaded) return <div>Loading Maps...</div>;

//   console.log(mapCenter, "zoomLevel")
//   console.log(selectedSocietiesData.l, "zoomLevel")

//   return (
//     <>
//       <CheckBox
//         societiesListSocieties={societiesListSocieties}
//         selectedSocietiesData={selectedSocietiesData}
//         setSelectedSocietiesData={setSelectedSocietiesData}
//       />
// <div className={styles.map_container}>
//   <div
//     className={styles.map}
//   >
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={mapCenter}
//             zoom={zoomLevel}
//             options={options}
//           >
//             {selectedSocietiesData.map(society => (
//               <OverlayView
//                 key={society.id}
//                 position={{ lat: parseFloat(society.lat), lng: parseFloat(society.long) }}
//                 mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//               >
//                 <div className="societie">
//                   <div className="RoundedMarkIcon">
//                     <CustomMarker center={center} lat={society.lat} lng={society.long} imageUrl={'/place.jpeg'} />
//                   </div>
//                   <div className="markName">
//                     <p>{society.name}</p>
//                   </div>
//                 </div>
//               </OverlayView>
//             ))}

//           </GoogleMap>
//         </div>
//       </div >
//     </>
//   );
// };

// export default Map;




import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import CheckBox from '../CheckBox';

// import React, { useMemo, useState } from 'react';
// import { GoogleMap, Marker, OverlayView, useLoadScript } from '@react-google-maps/api';
import styles from './index.module.scss';
import CustomMarker from '../CustomMarker';
// import CheckBox from '../CheckBox';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const options = {
  styles: [{ featureType: "all", stylers: [{ visibility: "on" }] }],
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ societiesListSocieties }) => {
  const [selectedSocietiesData, setSelectedSocietiesData] = useState([]);

  const calculateMapCenter = (data) => {
    if (!data.length) return { lat: 24.774265, lng: 46.738586 }; // Default center when no data
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
    if (!data.length) return 6; // Default zoom when no elements
    let bounds = new window.google.maps.LatLngBounds();
    data.forEach(item => {
      bounds.extend(new window.google.maps.LatLng(item.lat, item.long));
    });
    // This approximation helps to decide zoom level based on bounds
    const diagonalLength = google.maps.geometry.spherical.computeDistanceBetween(bounds.getNorthEast(), bounds.getSouthWest());

    if (diagonalLength < 1000) return 10; // close zoom for close markers
    if (diagonalLength < 5000) return 13; // medium zoom for moderate distance
    return 10; // default zoom for wider area
  };

  const mapCenter = useMemo(() => calculateMapCenter(selectedSocietiesData), [selectedSocietiesData]);
  const zoomLevel = useMemo(() => calculateZoomLevel(selectedSocietiesData), [selectedSocietiesData]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0',
    libraries: ["places", "geometry"],
  });

  if (!isLoaded) return <div>Loading Maps...</div>;

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
                    <CustomMarker center={mapCenter} lat={society.lat} lng={society.long} imageUrl={'/place.jpeg'} />
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

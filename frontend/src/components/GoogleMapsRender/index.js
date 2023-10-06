import React, { useState, useEffect, useMemo } from 'react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import { useLoadScript } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';

const LocationPin = () => (
  <div className="pin">
    <Icon fontSize={'50px'} color='red' icon={locationIcon} className="pin-icon" />
  </div>
);

export default function GoogleMapRender({ spot }) {
  const [location, setLocation] = useState(null);

  const address = useMemo(() => {
    if (spot.lat && spot.lon) {
      setLocation({ lat: spot.lat, lng: spot.lon });
      return null;
    }
    return `${spot.address}, ${spot.city}, ${spot.country}`;
  }, [spot]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded && address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const latLng = results[0].geometry.location;
          setLocation({ lat: latLng.lat(), lng: latLng.lng() });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }, [isLoaded, address]);

  if (!isLoaded) return <div>Loading...</div>;
  if (!location) return <div>Fetching address location...</div>;

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      defaultCenter={location}
      defaultZoom={15}
    >
      <LocationPin lat={location.lat} lng={location.lng} />
    </GoogleMapReact>
  );
}

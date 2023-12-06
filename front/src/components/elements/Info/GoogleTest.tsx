import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleTest = () => {
	return (
		<div className="map-container">
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyANrSZmh9Dzui1tXkC9H6R72Jv_03JxGcE' }}
				center={{ lat: 29.68402678282475, lng: 8.320964890236837 }}
				defaultZoom={12}
				// isMarkerShown
				yesIWantToUseGoogleMapApiInternals
			></GoogleMapReact>
		</div>
	);
};

export default GoogleTest;

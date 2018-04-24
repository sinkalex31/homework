import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';

const SimpleMap = compose(
    withProps({
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withGoogleMap,
)(({ coordinates }) => {
    const position = {
        lat: coordinates[0],
        lng: coordinates[1],
    };

    return (
        <GoogleMap
            zoom={17}
            center={position}
        >
            <Marker position={position} />
        </GoogleMap>
    );
});

SimpleMap.propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SimpleMap;
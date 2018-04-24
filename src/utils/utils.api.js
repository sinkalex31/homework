import { geocodeByAddress } from 'react-places-autocomplete';

export const searchAddress = async (query) => {
    let data;

    try {
        data = await geocodeByAddress(query);
    } catch (error) {
        return [];
    }

    return data.map(({ formatted_address, place_id, geometry: { location } }) => ({
        id: place_id,
        formatted: formatted_address,
        coordinates: JSON.stringify([location.lat(), location.lng()]),
    }));
};
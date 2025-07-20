import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = (params) => axios.get(BASE_URL, { params });
export const fetchCamperById = (id) => axios.get(`${BASE_URL}/${id}`); 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCamperDetail } from '../features/campers/campersSlice';
import VehicleDetail from '../components/VehicleDetail';

export default function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(state => state.campers.detail);

  useEffect(() => {
    dispatch(getCamperDetail(id));
  }, [dispatch, id]);

  if (!camper) return <div>Loading...</div>;

  return <VehicleDetail camper={camper} />;
} 
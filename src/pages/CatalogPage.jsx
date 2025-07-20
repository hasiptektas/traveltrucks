import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampers } from '../features/campers/campersSlice';
import Catalog from '../components/Catalog';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const campers = useSelector(state => state.campers.list);
  const status = useSelector(state => state.campers.status);
  const filters = useSelector(state => state.filters);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(getCampers());
  }, [dispatch]);

  // Filtreleme işlemi burada yapılmalı!
  const filteredCampers = campers.filter(camper => {
    if (filters.location && !camper.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.form && camper.form !== filters.form) return false;
    if (filters.AC && !camper.AC) return false;
    if (filters.kitchen && !camper.kitchen) return false;
    return true;
  });

  const visibleCampers = filteredCampers.slice(0, visibleCount);

  if (status === 'loading') return <div>Loading...</div>;

  return <Catalog products={visibleCampers} visibleCount={visibleCount} setVisibleCount={setVisibleCount} totalCount={filteredCampers.length} />;
} 
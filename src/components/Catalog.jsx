import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/filters/filtersSlice';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { toast } from 'react-toastify';
import { MapPinIcon, HeartIcon, StarIcon, Cog6ToothIcon, FireIcon, TvIcon, WrenchScrewdriverIcon, HomeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const equipment = [
  { key: 'AC', label: 'AC', icon: Cog6ToothIcon },
  { key: 'kitchen', label: 'Kitchen', icon: FireIcon },
  { key: 'TV', label: 'TV', icon: TvIcon },
  { key: 'bathroom', label: 'Bathroom', icon: HomeIcon },
];
const vehicleTypes = [
  { key: 'alcove', label: 'Alcove' },
  { key: 'panelTruck', label: 'Panel Truck' },
  { key: 'fullyIntegrated', label: 'Fully Integrated' },
  { key: 'van', label: 'Van' },
];

export default function Catalog({ products = [], visibleCount, setVisibleCount, totalCount }) {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const favorites = useSelector(state => state.favorites);

  const handleFavorite = (id) => {
    dispatch(toggleFavorite(id));
    if (favorites.includes(id)) {
      toast.info('Favorilerden çıkarıldı');
    } else {
      toast.success('Favorilere eklendi');
    }
  };

  return (
    <div className="flex min-h-screen pt-24 bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="w-[300px] bg-[#F8F9FA] border-r border-[#DEE2E6] p-6 flex-shrink-0">
        {/* Location Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#2C3E50] mb-2">Location</label>
          <div className="relative">
            <MapPinIcon className="w-5 h-5 text-[#6C757D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.location}
              onChange={e => dispatch(setFilter({ location: e.target.value }))}
              placeholder="Kyiv, Ukraine"
              className="w-full pl-10 pr-3 py-2 rounded bg-white border border-[#DEE2E6] focus:outline-none focus:ring-2 focus:ring-red-200 text-[#2C3E50]"
            />
          </div>
        </div>
        {/* Vehicle Type Filter */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-[#6C757D] mb-2">Vehicle type</div>
          <div className="grid grid-cols-2 gap-2">
            {vehicleTypes.map(type => (
              <button
                key={type.key}
                onClick={() => dispatch(setFilter({ form: filters.form === type.key ? '' : type.key }))}
                className={`flex flex-col items-center justify-center border rounded-lg p-2 text-xs font-medium ${
                  filters.form === type.key
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-[#DEE2E6] bg-white text-[#2C3E50]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        {/* Equipment Filter */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-[#6C757D] mb-2">Vehicle equipment</div>
          <div className="grid grid-cols-2 gap-2">
            {equipment.map(item => (
              <button
                key={item.key}
                onClick={() => dispatch(setFilter({ [item.key]: !filters[item.key] }))}
                className={`flex flex-col items-center justify-center border rounded-lg p-2 text-xs font-medium ${
                  filters[item.key]
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-[#DEE2E6] bg-white text-[#2C3E50]'
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {products.map((product) => (
            <Link to={`/catalog/${product.id}`} key={product.id} className="block">
              <div className="bg-white rounded-2xl shadow-sm border border-[#DEE2E6] flex flex-col md:flex-row gap-6 p-6 mb-6 items-start hover:shadow-md transition-shadow">
                <div className="w-full md:w-60 h-44 rounded-xl overflow-hidden flex-shrink-0 bg-[#E9ECEF] flex items-center justify-center">
                  <img src={product.gallery?.[0]?.thumb || ''} alt={product.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between w-full">
                    <h2 className="font-bold text-xl text-[#2C3E50]">{product.name}</h2>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#2C3E50] text-lg">€{Number(product.price).toFixed(2)}</span>
                      {favorites.includes(product.id) ? <HeartSolid className="w-6 h-6 text-red-500" /> : <HeartIcon className="w-6 h-6 text-[#6C757D]" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4A69BD]">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    {product.rating} ({product.reviews?.length || 0} Reviews)
                    <span className="text-[#6C757D] flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {product.location}</span>
                  </div>
                  <div className="text-[#6C757D] text-xs mb-1">{product.description}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {product.AC && <span className="flex items-center gap-1 bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#2C3E50]"><Cog6ToothIcon className="w-4 h-4" />AC</span>}
                    {product.kitchen && <span className="flex items-center gap-1 bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#2C3E50]"><FireIcon className="w-4 h-4" />Kitchen</span>}
                    {product.TV && <span className="flex items-center gap-1 bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#2C3E50]"><TvIcon className="w-4 h-4" />TV</span>}
                    {product.bathroom && <span className="flex items-center gap-1 bg-[#F8F9FA] border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#2C3E50]"><HomeIcon className="w-4 h-4" />Bathroom</span>}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-5 py-2 rounded-full font-semibold w-max">Show more</button>
                    <button
                      className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${favorites.includes(product.id) ? 'bg-red-50 border-red-500 text-red-500 hover:bg-red-100' : 'bg-white border-[#DEE2E6] text-[#2C3E50] hover:bg-[#F8F9FA]'}`}
                      type="button"
                      onClick={e => { e.preventDefault(); handleFavorite(product.id); }}
                    >
                      {favorites.includes(product.id) ? <HeartSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                      {favorites.includes(product.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* Load More butonu burada */}
          {typeof setVisibleCount === 'function' && visibleCount < totalCount && (
            <div className="flex justify-center mt-8">
              <button
                className="text-[#2C3E50] border border-[#DEE2E6] rounded-full px-6 py-2 text-sm hover:bg-[#F8F9FA]"
                onClick={() => setVisibleCount(c => c + 4)}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
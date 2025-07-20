import React, { useState } from 'react';
import { MapPinIcon, HeartIcon, StarIcon, Cog6ToothIcon, FireIcon, TvIcon, WrenchScrewdriverIcon, HomeIcon, RadioIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

export default function VehicleDetail({ camper }) {
  const [tab, setTab] = useState('features');
  if (!camper) return null;

  // Özellikler
  const features = [
    camper.transmission && { name: camper.transmission, icon: WrenchScrewdriverIcon },
    camper.AC && { name: 'AC', icon: Cog6ToothIcon },
    camper.engine && { name: camper.engine, icon: FireIcon },
    camper.kitchen && { name: 'Kitchen', icon: FireIcon },
    camper.TV && { name: 'TV', icon: TvIcon },
    camper.bathroom && { name: 'Bathroom', icon: HomeIcon },
    camper.radio && { name: 'Radio', icon: RadioIcon },
  ].filter(Boolean);

  // Teknik detaylar
  const vehicleDetails = [
    { label: 'Form', value: camper.form },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  // Galeri
  const gallery = camper.gallery || [];

  // Reviews
  const reviews = camper.reviews || [];

  return (
    <div className="pt-28 px-8 pb-12 max-w-6xl mx-auto">
      {/* Başlık ve fiyat */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">{camper.name}</h1>
          <div className="flex items-center gap-2 text-sm text-[#4A69BD] mb-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">{camper.rating}</span>
            <span className="text-[#6C757D]">({reviews.length} Reviews)</span>
            <span className="text-[#6C757D] flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {camper.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-2xl text-[#2C3E50]">€{Number(camper.price).toFixed(2)}</span>
          <button><HeartSolid className="w-7 h-7 text-red-500" /></button>
        </div>
      </div>
      {/* Galeri */}
      <div className="flex gap-4 mb-4 mt-2">
        {gallery.map((img, i) => (
          <div key={i} className="w-40 h-40 rounded-xl overflow-hidden bg-[#E9ECEF] flex items-center justify-center">
            <img src={img.thumb || img.original} alt="gallery" className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      {/* Açıklama */}
      <div className="mb-6 text-[#6C757D] text-sm max-w-3xl">
        {camper.description}
      </div>
      {/* Sekmeler */}
      <div className="flex gap-8 border-b mb-6">
        <button onClick={() => setTab('features')} className={`pb-2 px-2 font-medium text-sm border-b-2 transition-colors duration-200 ${tab === 'features' ? 'text-red-500 border-red-500' : 'text-[#2C3E50] border-transparent'}`}>Features</button>
        <button onClick={() => setTab('reviews')} className={`pb-2 px-2 font-medium text-sm border-b-2 transition-colors duration-200 ${tab === 'reviews' ? 'text-red-500 border-red-500' : 'text-[#2C3E50] border-transparent'}`}>Reviews</button>
      </div>
      {/* Sekme İçerikleri */}
      {tab === 'features' ? (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Özellikler ve teknik detaylar */}
          <div className="bg-[#F8F9FA] rounded-xl p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {features.map((f, idx) => (
                <span key={idx} className="flex items-center gap-1 bg-white border border-[#DEE2E6] rounded px-2 py-1 text-xs text-[#2C3E50]">
                  <f.icon className="w-4 h-4" /> {f.name}
                </span>
              ))}
            </div>
            <div>
              <div className="font-semibold text-[#2C3E50] mb-2">Vehicle details</div>
              <div className="grid grid-cols-2 gap-y-1 text-sm text-[#2C3E50]">
                {vehicleDetails.map((d, i) => (
                  <React.Fragment key={i}>
                    <div className="text-[#6C757D]">{d.label}</div>
                    <div>{d.value}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          {/* Rezervasyon formu */}
          <div className="bg-white rounded-xl p-6 border border-[#DEE2E6]">
            <div className="font-semibold text-[#2C3E50] mb-2">Book your campervan now</div>
            <div className="text-xs text-[#6C757D] mb-4">Stay connected! We are always ready to help you.</div>
            <form className="flex flex-col gap-3">
              <input className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Name*" />
              <input className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Email*" />
              <input className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Booking date*" />
              <textarea className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Comment" rows={3} />
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2 mt-2">Send</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Reviews */}
          <div>
            {reviews.map((r, i) => (
              <div key={i} className="flex gap-4 mb-6 items-start">
                <div className="w-10 h-10 rounded-full bg-[#F8F9FA] flex items-center justify-center font-bold text-lg text-red-400">
                  {(r.reviewer_name ? r.reviewer_name[0] : r.user?.[0])}
                </div>
                <div>
                  <div className="font-semibold text-[#2C3E50]">{r.reviewer_name || r.user}</div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon key={idx} className={`w-4 h-4 ${idx < (r.reviewer_rating || r.rating) ? 'text-yellow-400' : 'text-[#DEE2E6]'}`} />
                    ))}
                  </div>
                  <div className="text-[#6C757D] text-sm">{r.comment || r.text}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Rezervasyon formu */}
          <div className="bg-white rounded-xl p-6 border border-[#DEE2E6] h-max">
            <div className="font-semibold text-[#2C3E50] mb-2">Book your campervan now</div>
            <div className="text-xs text-[#6C757D] mb-4">Stay connected! We are always ready to help you.</div>
            <form className="flex flex-col gap-3">
              <input className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Name*" />
              <input className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Email*" />
              <input className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Booking date*" />
              <textarea className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm" placeholder="Comment" rows={3} />
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2 mt-2">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
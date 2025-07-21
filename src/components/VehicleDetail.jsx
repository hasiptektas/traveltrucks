import React, { useState } from 'react';
import { MapPinIcon, HeartIcon, StarIcon, Cog6ToothIcon, FireIcon, TvIcon, WrenchScrewdriverIcon, HomeIcon, RadioIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import trLocale from 'date-fns/locale/tr';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function VehicleDetail({ camper }) {
  const [tab, setTab] = useState('features');
  const [inputErrors, setInputErrors] = useState({ name: false, email: false, date: false });
  const [formValues, setFormValues] = useState({ name: '', email: '', date: '', comment: '' });
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  if (!camper) return null;

  const handleFavorite = (id) => {
    dispatch(toggleFavorite(id));
    if (favorites.includes(id)) {
      toast.info('Favorilerden çıkarıldı');
    } else {
      toast.success('Favorilere eklendi');
    }
  };

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

  // Form gönderim handler'ı
  function handleBookingSubmit(e) {
    e.preventDefault();
    const { name, email } = formValues;
    const date = selectedDate;
    const errors = {
      name: !name.trim(),
      email: !email.trim(),
      date: !date,
    };
    setInputErrors(errors);
    if (errors.name || errors.email || errors.date) {
      toast.error('Lütfen ad, e-posta ve rezervasyon tarihi alanlarını doldurun!');
      return;
    }
    // E-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInputErrors(prev => ({ ...prev, email: true }));
      toast.error('Lütfen geçerli bir e-posta adresi girin!');
      return;
    }
    setInputErrors({ name: false, email: false, date: false });
    toast.success('Rezervasyon talebiniz alınmıştır!');
    setFormValues({ name: '', email: '', date: '', comment: '' });
    setSelectedDate(null);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    setInputErrors(prev => ({ ...prev, [name]: false }));
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ef4444', // Tailwind red-500
      },
    },
  });

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
          <button type="button" onClick={() => handleFavorite(camper.id)}>
            {favorites.includes(camper.id) ? <HeartSolid className="w-7 h-7 text-red-500" /> : <HeartIcon className="w-7 h-7 text-[#6C757D]" />}
          </button>
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
            <form className="flex flex-col gap-3" onSubmit={handleBookingSubmit}>
              <input
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className={`rounded bg-[#F8F9FA] border px-3 py-2 text-sm ${inputErrors.name ? 'border-red-500 placeholder-red-400' : 'border-[#DEE2E6]'}`}
                placeholder={inputErrors.name ? 'Boş bırakılamaz' : 'Name*'}
              />
              <input
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className={`rounded bg-[#F8F9FA] border px-3 py-2 text-sm ${inputErrors.email ? 'border-red-500 placeholder-red-400' : 'border-[#DEE2E6]'}`}
                placeholder={inputErrors.email ? (formValues.email ? 'Geçersiz e-posta' : 'Boş bırakılamaz') : 'Email*'}
              />
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
                  <DatePicker
                    label="Booking date*"
                    value={selectedDate}
                    onChange={newValue => setSelectedDate(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="date"
                        error={inputErrors.date}
                        helperText={inputErrors.date ? 'Boş bırakılamaz' : ''}
                        fullWidth
                        sx={{ backgroundColor: '#F8F9FA' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </ThemeProvider>
              <textarea
                name="comment"
                value={formValues.comment}
                onChange={handleInputChange}
                className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm"
                placeholder="Comment"
                rows={3}
              />
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
            <form className="flex flex-col gap-3" onSubmit={handleBookingSubmit}>
              <input
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                className={`rounded bg-[#F8F9FA] border px-3 py-2 text-sm ${inputErrors.name ? 'border-red-500 placeholder-red-400' : 'border-[#DEE2E6]'}`}
                placeholder={inputErrors.name ? 'Boş bırakılamaz' : 'Name*'}
              />
              <input
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className={`rounded bg-[#F8F9FA] border px-3 py-2 text-sm ${inputErrors.email ? 'border-red-500 placeholder-red-400' : 'border-[#DEE2E6]'}`}
                placeholder={inputErrors.email ? (formValues.email ? 'Geçersiz e-posta' : 'Boş bırakılamaz') : 'Email*'}
              />
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
                  <DatePicker
                    label="Booking date*"
                    value={selectedDate}
                    onChange={newValue => setSelectedDate(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="date"
                        error={inputErrors.date}
                        helperText={inputErrors.date ? 'Boş bırakılamaz' : ''}
                        fullWidth
                        sx={{ backgroundColor: '#F8F9FA' }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </ThemeProvider>
              <textarea
                name="comment"
                value={formValues.comment}
                onChange={handleInputChange}
                className="rounded bg-[#F8F9FA] border border-[#DEE2E6] px-3 py-2 text-sm"
                placeholder="Comment"
                rows={3}
              />
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2 mt-2">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
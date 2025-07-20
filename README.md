# TravelTrucks

Modern Karavan Katalog Uygulaması

## Özellikler
- Vite + React ile hızlı ve modern frontend
- Redux Toolkit ile global state yönetimi (araçlar, filtreler, favoriler)
- Axios ile gerçek API'den veri çekme
- React Router ile çoklu sayfa ve detay navigasyonu
- Tailwind CSS ile responsive ve şık arayüz
- Dinamik filtreleme (konum, araç tipi, ekipmanlar)
- Favorilere ekleme (localStorage ile kalıcı)
- Detay sayfasında galeri, teknik bilgiler, yorumlar ve rezervasyon formu
- "Load More" ile kartları 4'er 4'er yükleme

## Kurulum

1. **Gerekli Paketleri Yükle:**
   ```bash
   npm install
   # veya
   yarn install
   ```

2. **Gerekli Ekstra Paketler:**
   ```bash
   npm install @reduxjs/toolkit react-redux axios react-router-dom @heroicons/react
   ```

3. **Projeyi Başlat:**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. **Görseller:**
   - Ana sayfa ve katalog için uygun görselleri `public/hero.jpg` veya `src/assets/` klasörüne ekleyin.

## API
- Tüm veriler [MockAPI](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers) üzerinden çekilmektedir.
- Filtreleme işlemleri frontend'de yapılır.

## Proje Yapısı
```
src/
  api/           # Axios API servisleri
  app/           # Redux store
  components/    # Tüm React bileşenleri
  features/      # Redux slice'ları
  pages/         # Sayfa bileşenleri (Home, Catalog, Detail)
  assets/        # Görseller
  index.css      # Tailwind ve global stiller
  main.jsx       # Uygulama girişi
```

## Kullanım
- Ana sayfada "View Now" ile katalog sayfasına geçin.
- Filtreleri kullanarak karavanları daraltın.
- Favorilere ekleyin, detay sayfasında galeri ve yorumları inceleyin.
- "Load More" ile daha fazla kart yükleyin.

## Lisans
MIT

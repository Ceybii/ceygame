# 🎮 Ceygame - YouTube Kanal Tanıtım Web Sitesi

Modern, statik, SEO-optimize edilmiş YouTube kanal tanıtım sitesi. FPS ve rekabetçi oyun içerikleri için tasarlanmış, tamamen statik hosting destekli (FTP ile deploy edilebilir) profesyonel web sitesi.

## ✨ Özellikler

### 🚀 Performans & Teknoloji
- **Astro 4.x** - Ultra hızlı statik site generator
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern, responsive tasarım
- **Statik Hosting** - PHP/Sunucu gerektirmez, sadece FTP yeterli
- **Lighthouse 95+** hedefi

### 📺 YouTube Entegrasyonu
- YouTube Data API v3 ile **otomatik video listeleme**
- Client-side fetch (statik hosting uyumlu)
- 10 dakika localStorage cache
- Video detay sayfaları (SEO optimize)
- Responsive video grid
- Thumbnail lazy loading

### 💬 Forum/Topluluk
- **Giscus** (GitHub Discussions) veya **Disqus** entegrasyonu
- Backend olmadan topluluk özelliği
- Kolay kurulum ve yönetim

### 🎯 SEO & Erişilebilirlik
- Otomatik `sitemap.xml` üretimi
- `robots.txt` yapılandırması
- Open Graph ve Twitter Card meta tags
- JSON-LD structured data (Organization, WebSite, VideoObject)
- Canonical URL'ler
- Semantic HTML5
- WCAG AA uyumlu

### 🎨 Tasarım
- Dark mode default (toggle hazır)
- Modern gaming/teknoloji estetiği
- Neon vurgu renkleri (erişilebilir)
- Smooth animasyonlar
- Mobil öncelikli responsive tasarım
- Sticky header, backdrop blur

## 📋 Gereksinimler

- **Node.js** 18.x veya üzeri
- **npm** veya **yarn**
- **YouTube Data API Key** (opsiyonel ama önerilir)
- **FTP erişimi** (deploy için)

## 🛠️ Kurulum

### 1. Projeyi Klonlayın veya İndirin

```bash
git clone <repo-url>
cd ceygame
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
# ZORUNLU
PUBLIC_SITE_URL=https://ceygame.com

# ÖNERİLİR - YouTube API
PUBLIC_YT_API_KEY=your_youtube_api_key_here
PUBLIC_YT_CHANNEL_ID=your_channel_id_here

# Forum (birini seçin)
PUBLIC_FORUM_PROVIDER=giscus

# Giscus için
PUBLIC_GISCUS_REPO=owner/repo
PUBLIC_GISCUS_REPO_ID=R_xxxxx
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx

# Disqus için (alternatif)
# PUBLIC_DISQUS_SHORTNAME=your_disqus_shortname
```

### 4. Development Server'ı Çalıştırın

```bash
npm run dev
```

Tarayıcınızda `http://localhost:4321` adresini açın.

### 5. Production Build

```bash
npm run build
```

Build tamamlandığında `dist/` klasörü oluşur. Bu klasörü FTP ile sunucunuza yükleyin.

## 🔑 YouTube API Kurulumu

### API Key Alma

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni bir proje oluşturun veya mevcut projeyi seçin
3. **APIs & Services > Library** bölümünden "YouTube Data API v3" arayın
4. API'yi aktifleştirin
5. **APIs & Services > Credentials** bölümüne gidin
6. **Create Credentials > API Key** seçin
7. API Key'inizi kopyalayın

### API Key Güvenliği (ÖNEMLİ!)

API Key'inizi güvenli tutmak için **HTTP referrer restrictions** ekleyin:

1. Credentials sayfasında API Key'inize tıklayın
2. **Application restrictions** bölümünde "HTTP referrers" seçin
3. **Website restrictions** bölümüne alan adınızı ekleyin:
   ```
   ceygame.com/*
   *.ceygame.com/*
   ```
4. Kaydedin

### Kanal ID Bulma

YouTube kanal URL'nizi kontrol edin:
- `youtube.com/channel/UCxxxxxxxxxx` → Kanal ID: `UCxxxxxxxxxx`
- `youtube.com/@kullaniciadi` → Kanal sayfasında sağ tıklayıp "Kaynağı Görüntüle" yapın, `"channelId":"UCxxxxxxxxxx"` arayın

### Quota Limitleri

YouTube Data API v3 günlük **10,000 birim** ücretsiz quota verir. Video listeleme ~5 birim harcar. 
Client-side cache (10 dk) sayesinde quota kullanımı optimize edilmiştir.

## 💬 Forum Kurulumu

### Seçenek 1: Giscus (Önerilen)

Giscus, GitHub Discussions kullanarak ücretsiz forum sağlar.

#### Adımlar:

1. **GitHub Repository Oluşturun**
   - Public repository olmalı (örn: `ceygame/discussions`)

2. **Discussions'ı Aktifleştirin**
   - Repo Settings > Features > Discussions ✓

3. **Giscus App'i Yükleyin**
   - [github.com/apps/giscus](https://github.com/apps/giscus) adresine gidin
   - Repository'nize erişim verin

4. **Giscus Yapılandırması**
   - [giscus.app/tr](https://giscus.app/tr) adresine gidin
   - Repository'nizi girin
   - Ayarları yapılandırın
   - Üretilen değerleri `.env` dosyanıza kopyalayın

```env
PUBLIC_FORUM_PROVIDER=giscus
PUBLIC_GISCUS_REPO=ceygame/discussions
PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxxx
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxxx
```

### Seçenek 2: Disqus

1. [disqus.com](https://disqus.com/admin/create/) adresine gidin
2. Yeni site oluşturun
3. Shortname'i not edin
4. `.env` dosyasını güncelleyin:

```env
PUBLIC_FORUM_PROVIDER=disqus
PUBLIC_DISQUS_SHORTNAME=ceygame
```

## 📤 FTP ile Deploy

### 1. Build Oluşturun

```bash
npm run build
```

### 2. FTP İstemcisi ile Yükleyin

FileZilla, Cyberduck veya tercih ettiğiniz FTP programını kullanın:

1. FTP sunucunuza bağlanın
2. `dist/` klasörünün **içeriğini** (klasörün kendisini değil!) public_html veya www dizinine yükleyin

```
Doğru:
public_html/
  ├── index.html
  ├── videos/
  ├── forum/
  ├── _astro/
  └── ...

Yanlış:
public_html/
  └── dist/
      ├── index.html
      └── ...
```

### 3. .htaccess (Apache için - opsiyonel)

Apache sunucularda temiz URL'ler için `.htaccess` ekleyin:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Mevcut dosya veya dizin değilse index.html'e yönlendir
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ /index.html [L]
</IfModule>
```

**Not:** Astro statik build'lerde her sayfa ayrı HTML dosyası olarak oluşturulur (`/about/index.html`), 
bu nedenle çoğu durumda `.htaccess` gerekmez. Ancak dynamic route'lar için yararlı olabilir.

## 🔍 SEO Optimizasyonu

### Google Search Console Kurulumu

1. [search.google.com/search-console](https://search.google.com/search-console) adresine gidin
2. Property ekleyin: `https://ceygame.com`
3. Doğrulama yöntemi seçin:
   - **HTML tag:** `.env` dosyasına verification code ekleyin:
     ```env
     PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
     ```
   - **HTML dosyası:** `public/` klasörüne verification dosyası ekleyin

4. Sitemap gönderin: `https://ceygame.com/sitemap-index.xml`

### Sitemap Güncelleme

Sitemap otomatik oluşturulur. Yeni sayfa eklediyseniz:

1. `astro.config.mjs` dosyasında `sitemap` konfigürasyonunu güncelleyin
2. `npm run build` çalıştırın
3. Google Search Console'dan sitemap'i yeniden gönderin

### Meta Tags Özelleştirme

Sayfa bazlı SEO ayarları için `src/pages/` altındaki dosyalarda `seo` prop'unu kullanın:

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';

---

<BaseLayout
  seo={{
    title: 'Özel Sayfa Başlığı',
    description: 'Özel sayfa açıklaması (max 160 karakter)',
    ogImage: '/custom-og-image.jpg'
  }}
>
  <!-- Sayfa içeriği -->
</BaseLayout>
```

## 🎨 Özelleştirme

### Renkler

`tailwind.config.cjs` dosyasında renk paletini değiştirin:

```js
theme: {
  extend: {
    colors: {
      accent: {
        DEFAULT: '#00ffff', // Ana vurgu rengi
        dark: '#00cccc',
        light: '#66ffff',
      },
      // ...
    }
  }
}
```

### Logo ve Branding

- Logo: `src/components/Header.astro` ve `Footer.astro` dosyalarında "CEYGAME" text'ini değiştirin
- Favicon: `public/favicon.svg` dosyasını kendi logonuzla değiştirin
- OG Image: `public/og-default.png` ekleyin (1200x630px önerilir)

### Öne Çıkan Oynatma Listeleri

`src/lib/config.ts` dosyasında `featuredPlaylists` arrayini güncelleyin:

```typescript
featuredPlaylists: [
  {
    id: 'PLxxxxxxxxxxxxxxxxxx', // YouTube playlist ID
    title: 'Valorant Taktikleri',
    description: 'Pro oyuncuların kullandığı taktikler'
  },
  // ...
]
```

### Sosyal Medya Linkleri

`src/lib/config.ts` dosyasında `social` objesini güncelleyin:

```typescript
social: {
  youtube: 'https://www.youtube.com/@Ceybi?sub_confirmation=1',
  twitter: 'https://twitter.com/ceygame',
  discord: 'https://discord.gg/xxxxx',
  instagram: 'https://instagram.com/ceygame',
  twitch: 'https://twitch.tv/ceygame'
}
```

## 📁 Proje Yapısı

```
ceygame/
├── public/                 # Statik dosyalar (robots.txt, favicon, vs.)
├── src/
│   ├── components/        # Reusable componentler
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── VideoCard.astro
│   │   └── ...
│   ├── layouts/           # Layout componentleri
│   │   └── BaseLayout.astro
│   ├── lib/              # Utility fonksiyonlar
│   │   ├── youtube.ts    # YouTube API client
│   │   ├── seo.ts        # SEO helpers
│   │   └── config.ts     # Site konfigürasyonu
│   ├── pages/            # Route sayfaları
│   │   ├── index.astro         # Ana sayfa
│   │   ├── videos/
│   │   │   ├── index.astro     # Video listesi
│   │   │   └── [id].astro      # Video detay
│   │   ├── forum.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   └── env.d.ts
├── .env                   # Environment variables (git'e eklemeyin!)
├── .env.example          # Örnek env dosyası
├── astro.config.mjs      # Astro konfigürasyonu
├── tailwind.config.cjs   # Tailwind konfigürasyonu
├── tsconfig.json         # TypeScript konfigürasyonu
├── package.json
└── README.md
```

## 🚀 Upgrade Path (İleri Seviye)

Statik hosting sınırlamaları nedeniyle videolar client-side fetch ile yüklenir. 
Bu, Google'ın video listesini hemen indeksleyemeyeceği anlamına gelir.

### Gerçek Pre-render ile Video SEO

Daha iyi SEO için videoları build-time'da pre-render edebilirsiniz:

#### Seçenek 1: Cloudflare Pages + Scheduled Build

1. Projeyi Cloudflare Pages'e deploy edin
2. Cloudflare Workers ile cron job oluşturun
3. Günde 1-2 kez otomatik rebuild tetikleyin
4. Her build'de son videolar pre-render edilir

#### Seçenek 2: GitHub Actions + Scheduled Build

1. GitHub Actions workflow oluşturun
2. Cron schedule ile günlük rebuild
3. Build sonrası FTP ile otomatik deploy

#### Seçenek 3: Astro Server-Side Rendering (Hybrid)

Astro'nun hybrid mode'unu kullanarak bazı sayfaları SSR yapabilirsiniz. 
Ancak bu, Node.js destekli hosting gerektirir (Vercel, Netlify, vs.)

## 🐛 Troubleshooting

### Videolar Yüklenmiyor

**Sorun:** Ana sayfada veya videolar sayfasında videolar görünmüyor.

**Çözümler:**
1. `.env` dosyasında `PUBLIC_YT_API_KEY` ve `PUBLIC_YT_CHANNEL_ID` doğru mu kontrol edin
2. Browser console'da hata mesajlarını kontrol edin (F12)
3. YouTube API Key'in HTTP referrer restrictions'ını kontrol edin
4. API quota'nızı kontrol edin: [console.cloud.google.com](https://console.cloud.google.com/)

### Forum Görünmüyor

**Sorun:** Forum sayfası "Forum yapılandırılmamış" hatası veriyor.

**Çözümler:**
1. `.env` dosyasında forum provider seçili mi kontrol edin
2. Giscus kullanıyorsanız: Repo ID, Category ID gibi değerlerin doğru olduğunu kontrol edin
3. GitHub Discussions'ın aktif olduğunu kontrol edin
4. giscus app'inin repository'nize yüklendiğini kontrol edin

### Build Hataları

**Sorun:** `npm run build` hata veriyor.

**Çözümler:**
1. `node_modules` silip tekrar yükleyin: `rm -rf node_modules && npm install`
2. Node.js versiyonunu kontrol edin: `node -v` (18.x+ olmalı)
3. TypeScript hatalarını kontrol edin: `npm run astro check`

### Sitemap Oluşmuyor

**Sorun:** `sitemap-index.xml` dosyası bulunamıyor.

**Çözümler:**
1. `astro.config.mjs` dosyasında `@astrojs/sitemap` integration'ın ekli olduğunu kontrol edin
2. `site` URL'inin doğru olduğunu kontrol edin
3. Build sonrası `dist/` klasöründe sitemap'in oluştuğunu kontrol edin

## 📊 Performans İpuçları

### Image Optimization

Görselleri optimize edin:
- **Format:** WebP veya AVIF kullanın
- **Boyut:** 1920px'den büyük görsellere gerek yok
- **Sıkıştırma:** TinyPNG, Squoosh gibi araçlar kullanın
- **Lazy loading:** `loading="lazy"` attribute'u zaten kullanılıyor

### Font Optimization

System font kullanıyoruz (en hızlı seçenek). Özel font kullanmak isterseniz:

1. Google Fonts yerine self-hosted font kullanın
2. Sadece gerekli font weights'i yükleyin
3. `font-display: swap` kullanın

### Analytics

Statik hosting için lightweight analytics çözümleri:
- **Cloudflare Web Analytics** (ücretsiz, privacy-friendly)
- **Plausible** (paid, privacy-friendly)
- **Google Analytics 4** (ücretsiz)

`src/layouts/BaseLayout.astro` dosyasına analytics script'ini ekleyin.

## 🤝 Katkıda Bulunma

Bu proje açık kaynak değildir ancak hatalar ve öneriler için iletişime geçebilirsiniz.

## 📄 Lisans

Tüm hakları saklıdır © 2025 Ceygame

## 🆘 Destek

Sorularınız veya sorunlarınız için:
- **Web:** [ceygame.com/contact](https://ceygame.com/contact)
- **YouTube:** [@Ceybi](https://youtube.com/@Ceybi)

---

**Made with ❤️ for the gaming community**

Bu proje **Astro + TypeScript + Tailwind** ile geliştirilmiştir ve **statik hosting** için optimize edilmiştir. FTP ile deploy edilebilir, sunucu gerektirmez.


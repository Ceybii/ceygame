Sen kıdemli bir frontend/SEO mühendisisin. Bana ceygame.com alan adı için tamamen statik (FTP ile dist yüklenerek çalışacak) modern bir YouTube kanal tanıtım web sitesi üret.

KRİTİK KISIT
- Hosting: Sadece statik hosting. Sunucu yok. PHP yok. Veritabanı yok.
- Deploy: `npm run build` sonrası oluşan `dist/` klasörünü FTP ile yükleyince çalışmalı.
- Kod tabanı: Astro + TypeScript + Tailwind (performans ve SEO için). Vite build pipeline Astro ile.
- Tasarım: Çok modern, oyun/teknoloji estetiği, premium hissiyat, hızlı, responsive. Dark mode default + toggle.

SİTE AMAÇLARI
1) YouTube kanalımın vitrin sitesi: ana sayfada kanal CTA, son videolar, öne çıkan oynatma listeleri, abone ol butonları.
2) YouTube’da paylaştığım videolar otomatik olarak web sitesine eklensin (statik hosting kısıtına rağmen, client-side fetch ile).
3) “Forum/Topluluk” bölümü olsun (backend kurmadan): giscus (GitHub Discussions) veya Disqus embed ile.
4) Full SEO altyapısı: Google hızlı index alabilsin (statik sınırlar dahilinde en iyi pratikler), Lighthouse 95+ hedefi.

SAYFALAR
- / (Home)
  - Hero: “CEYGAME” + kısa slogan + Subscribe CTA + YouTube link
  - “Latest Videos” grid (YouTube’dan otomatik)
  - “Featured Playlists” (manuel config ile)
  - “Why Ceygame?” değer önerisi (FPS, rekabetçi oyunlar, highlights vs.)
  - “Join Community” CTA (Forum + Discord/YouTube)
- /videos
  - Filtre/sort: newest/most popular (API kısıtı varsa newest yeter)
  - Arama (client-side)
  - Infinite scroll veya “Load more”
- /videos/[id]
  - Video embed
  - Video meta: title, publish date, duration, view count (mümkünse)
  - SEO: VideoObject schema (mümkünse video verisinden)
- /forum
  - Backend olmadan forum: 2 seçenekli altyapı kur
    A) giscus (GitHub Discussions) öner (tercih)
    B) Disqus alternatif
  - Tek bir “community hub” sayfası + kategoriler UI (UI kategorileri statik olabilir)
- /about
- /contact (form: mailto + ayrıca Formspree gibi kurulum gerektirmeyen opsiyon; ama default mailto)
- /privacy, /terms

YOUTUBE ENTEGRASYONU (OTOMATİK VİDEO)
- Tercih sırası:
  1) YouTube Data API v3 ile client-side fetch (API key gerektirir).
  2) API key yoksa: kanal RSS feed + güvenilir CORS-friendly fetch stratejisi (uygun değilse en azından fallback).
- ENV değişkenleri:
  - PUBLIC_YT_API_KEY=
  - PUBLIC_YT_CHANNEL_ID= (veya uploads playlist id)
  - PUBLIC_SITE_URL=https://ceygame.com
- Güvenlik: API key domain restriction öner (dokümantasyon notu ekle).
- Performans:
  - 10 dk cache (localStorage) + “stale-while-revalidate” mantığı
  - Hata durumunda graceful fallback UI (skeleton + “Try again”)
- UI:
  - Video cards: thumbnail, title, duration badge, publish date, views (varsa)
  - Responsive grid

SEO (ÇOK ÖNEMLİ)
- Teknik SEO:
  - Statik HTML: Astro ile tüm ana sayfalar SSR->static pre-render.
  - `sitemap.xml` otomatik üret (Astro sitemap entegrasyonu veya custom).
  - `robots.txt` üret.
  - canonical, meta title/description, OG/Twitter cards.
  - JSON-LD:
    - Organization / WebSite schema site genelinde
    - Video detail sayfasında VideoObject schema (mümkünse)
- İçerik SEO:
  - Her sayfaya özel title/description.
  - /videos sayfasında açıklayıcı intro metin (keyword stuffing olmadan).
- Hız:
  - Font optimizasyonu (system font veya optimize edilen tek font)
  - Image lazy-load, width/height set
  - Minimal JS (Astro islands yaklaşımı)
- Index hızını artırmak için:
  - Search Console doğrulama meta alanı (configten girilebilir)
  - RSS feed: /rss.xml (site updates + video updates mümkünse)
NOT: Statik hosting + client-side video fetch, Google’ın her zaman “anında” video listesini indeksleyeceğini garanti etmez. Bunu README’de dürüstçe belirt ve “upgrade path” ekle: Cloudflare Pages + scheduled build ile gerçek pre-render.

TASARIM SİSTEMİ
- Tailwind + minimal component set
- Renkler: koyu arka plan, vurgu rengi neon/elektrik (ama erişilebilirlik AA)
- Animasyonlar: hafif (Framer Motion kullanma; Astro + CSS)
- Header: sticky, küçük blur backdrop, menü
- Footer: sosyal linkler, telif, sitemap linkleri
- CTA butonlar: “Subscribe”, “Watch Latest”, “Join Forum”

PROJE ÇIKTISI
- Repo yapısı:
  - /src
    - /pages
    - /components
    - /lib (youtube client, seo helpers)
    - /content (about/privacy/terms markdown)
  - /public (og-default.png, favicon set)
- Komutlar:
  - npm install
  - npm run dev
  - npm run build  -> dist/
- README.md:
  - FTP deploy adımları
  - ENV ayarları
  - YouTube API key restriction nasıl yapılır
  - Forum seçenekleri (giscus/disqus) nasıl aktif edilir
  - SEO checklist (Search Console, sitemap submit)
  - Upgrade path (opsiyonel): serverless/build cron ile gerçek video pre-render

FORUM (giscus tercihi)
- ENV:
  - PUBLIC_FORUM_PROVIDER=giscus|disqus
  - PUBLIC_GISCUS_REPO=owner/repo
  - PUBLIC_GISCUS_REPO_ID=
  - PUBLIC_GISCUS_CATEGORY=
  - PUBLIC_GISCUS_CATEGORY_ID=
  - PUBLIC_DISQUS_SHORTNAME=
- /forum sayfasında provider’a göre embed otomatik seçilsin.
- giscus için “GitHub Discussions açılmalı” notu README’de.

KABUL KRİTERLERİ
- dist/ klasörü FTP ile yüklenince direkt çalışıyor.
- Home sayfası çok modern, mobil/desktop kusursuz.
- Videolar sayfası YouTube’dan otomatik son videoları çekiyor.
- Forum sayfası embed ile çalışıyor.
- sitemap.xml, robots.txt, meta/OG, JSON-LD var.
- Lighthouse performans/SEO yüksek hedeflenmiş.
- Kod temiz, tipli, açıklayıcı.

Şimdi projeyi üret: gerekli tüm dosyaları oluştur, package.json bağımlılıkları, astro config, tailwind config, sayfalar, componentler, lib yardımcıları, README.

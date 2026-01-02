# 🚀 Deployment Rehberi - Ceygame

Bu dokümanda, ceygame.com sitesinin FTP ile nasıl deploy edileceği adım adım anlatılmaktadır.

## 📋 Ön Hazırlık

### 1. Environment Variables Ayarlayın

`.env` dosyasını production değerleri ile güncelleyin:

```env
PUBLIC_SITE_URL=https://ceygame.com
PUBLIC_YT_API_KEY=your_youtube_api_key
PUBLIC_YT_CHANNEL_ID=your_channel_id
PUBLIC_FORUM_PROVIDER=giscus
PUBLIC_GISCUS_REPO=ceygame/discussions
PUBLIC_GISCUS_REPO_ID=R_xxxxx
PUBLIC_GISCUS_CATEGORY=General
PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

### 2. Build Oluşturun

```bash
# Bağımlılıkları yükleyin (ilk kez)
npm install

# TypeScript ve Astro check
npm run astro check

# Production build
npm run build
```

Build başarılı olursa `dist/` klasörü oluşacaktır.

### 3. Build'i Test Edin

```bash
npm run preview
```

Tarayıcınızda `http://localhost:4321` adresini açın ve siteyi test edin:
- ✅ Tüm sayfalar çalışıyor mu?
- ✅ Videolar yükleniyor mu?
- ✅ Forum görünüyor mu?
- ✅ Linkler doğru mu?
- ✅ Responsive tasarım çalışıyor mu?

## 📤 FTP ile Deploy

### Yöntem 1: FileZilla (Önerilen - Kolay)

1. **FileZilla İndir ve Yükle**
   - [filezilla-project.org](https://filezilla-project.org/) adresinden indirin

2. **FTP Bağlantısı Oluştur**
   - Site Manager'ı açın (File > Site Manager)
   - New Site oluşturun
   - Bilgileri girin:
     ```
     Host: ftp.ceygame.com (veya hosting sağlayıcınızın verdiği adres)
     Port: 21
     Protocol: FTP - File Transfer Protocol
     Encryption: Require explicit FTP over TLS
     Logon Type: Normal
     User: ftp_username
     Password: ftp_password
     ```
   - Connect

3. **Dosyaları Yükle**
   - Sol panel: Bilgisayarınızdan `dist/` klasörünü bulun
   - Sağ panel: Sunucuda `public_html/` veya `www/` dizinine gidin
   - `dist/` klasörünün **içindeki tüm dosyaları** seçin (klasörün kendisini değil!)
   - Sağ tıklayıp "Upload" veya sürükle-bırak

4. **Transfer Modunu Ayarlayın**
   - Transfer > Transfer Type > Auto
   - Binary mode otomatik seçilecektir

5. **Doğrulama**
   - Transfer tamamlandığında `https://ceygame.com` adresini ziyaret edin

### Yöntem 2: WinSCP (Windows)

1. **WinSCP İndir ve Yükle**
   - [winscp.net](https://winscp.net/) adresinden indirin

2. **Oturum Oluştur**
   - New Site
   - File protocol: FTP
   - Encryption: TLS/SSL Explicit encryption
   - Host name, User name, Password girin
   - Login

3. **Senkronizasyon (Önerilen)**
   - Sol panel: `dist/` klasörüne gidin
   - Sağ panel: `public_html/` dizinine gidin
   - Commands > Synchronize
   - Direction: Local to Remote
   - Synchronize

### Yöntem 3: Cyberduck (Mac/Windows)

1. **Cyberduck İndir ve Yükle**
   - [cyberduck.io](https://cyberduck.io/) adresinden indirin

2. **Bağlantı**
   - Open Connection
   - FTP-SSL (Explicit AUTH TLS) seçin
   - Server, Username, Password girin
   - Connect

3. **Upload**
   - Sunucuda `public_html/` dizinine gidin
   - `dist/` klasörünün içeriğini sürükle-bırak

### Yöntem 4: Terminal/CLI (Linux/Mac)

```bash
# lftp kurulu değilse yükleyin
# Ubuntu/Debian: sudo apt install lftp
# Mac: brew install lftp

# FTP'ye bağlan
lftp -u ftp_username,ftp_password ftp.ceygame.com

# Hedef dizine git
cd public_html

# Mirror upload (senkronizasyon)
mirror -R dist/ .

# Çıkış
bye
```

## ✅ Deployment Checklist

Deploy sonrası kontrol listesi:

### Temel Kontroller
- [ ] Ana sayfa yükleniyor (https://ceygame.com)
- [ ] Header ve footer doğru görünüyor
- [ ] Hero section animasyonları çalışıyor
- [ ] Sosyal medya linkleri doğru

### Video Sayfaları
- [ ] Ana sayfada son videolar görünüyor
- [ ] /videos sayfası çalışıyor
- [ ] Video arama fonksiyonu çalışıyor
- [ ] Video detay sayfası çalışıyor (/videos/[id])
- [ ] Video embed oynatılabiliyor

### Forum
- [ ] /forum sayfası açılıyor
- [ ] Giscus/Disqus embed yükleniyor
- [ ] Yorum yapılabiliyor (test edin)

### Diğer Sayfalar
- [ ] /about sayfası çalışıyor
- [ ] /contact sayfası çalışıyor
- [ ] /privacy sayfası çalışıyor
- [ ] /terms sayfası çalışıyor

### SEO & Meta
- [ ] `https://ceygame.com/sitemap-index.xml` erişilebilir
- [ ] `https://ceygame.com/robots.txt` erişilebilir
- [ ] Sayfaların title ve description doğru
- [ ] Open Graph tags doğru (Facebook/Discord önizleme test edin)
- [ ] Favicon görünüyor

### Responsive & Performance
- [ ] Mobil görünüm çalışıyor
- [ ] Tablet görünüm çalışıyor
- [ ] Desktop görünüm çalışıyor
- [ ] Lighthouse score kontrol edin (F12 > Lighthouse)
  - Performance: 90+
  - Accessibility: 90+
  - Best Practices: 90+
  - SEO: 95+

## 🔄 Güncelleme Workflow

Site güncellemesi yapmak için:

1. **Değişiklik Yapın**
   - Kod değişikliği yapın
   - `npm run dev` ile test edin

2. **Build Oluşturun**
   ```bash
   npm run build
   ```

3. **Preview**
   ```bash
   npm run preview
   ```

4. **Deploy**
   - FTP ile `dist/` klasörünü tekrar yükleyin
   - Değişen dosyalar üzerine yazılacaktır

5. **Cache Temizleme**
   - Tarayıcı cache: Ctrl+F5 (hard refresh)
   - Cloudflare kullanıyorsanız: Purge All

## 🐛 Deploy Sonrası Sorun Giderme

### Sayfa 404 Veriyor

**Sorun:** Bazı sayfalar 404 hatası veriyor.

**Çözüm:**
1. Dosyaların doğru yüklendiğini kontrol edin
2. FTP'de `public_html/videos/index.html` dosyasının var olduğunu kontrol edin
3. `.htaccess` dosyası gerekebilir (Apache sunucularda)

### Videolar Yüklenmiyor

**Sorun:** Ana sayfada veya video sayfasında videolar görünmüyor.

**Çözüm:**
1. Browser console (F12) hatalarını kontrol edin
2. YouTube API Key'in production domain'e izin verdiğini kontrol edin
3. `.env` dosyasının production değerleri ile build edildiğini kontrol edin
4. CORS hatası varsa, YouTube API Key restrictions'ı kontrol edin

### Styles Yüklenmiyor / Bozuk Görünüyor

**Sorun:** CSS stilleri yüklenmiyor veya sayfa düzensiz görünüyor.

**Çözüm:**
1. FTP transfer mode'unun Binary olduğunu kontrol edin
2. `_astro/` klasörünün tamamen yüklendiğini kontrol edin
3. Browser cache'i temizleyin (Ctrl+Shift+Delete)
4. `.css` dosyalarının MIME type'ı `text/css` olmalı (hosting panelinden kontrol edin)

### Forum Çalışmıyor

**Sorun:** Forum sayfasında embed görünmüyor.

**Çözüm:**
1. `.env` dosyasında forum ayarlarının doğru olduğunu kontrol edin
2. Build sırasında env değerlerinin dahil edildiğini kontrol edin
3. Giscus: GitHub Discussions'ın public ve aktif olduğunu kontrol edin
4. Browser console'da JavaScript hatalarını kontrol edin

## 🚀 Otomatik Deploy (İsteğe Bağlı)

### GitHub Actions ile Otomatik FTP Deploy

`.github/workflows/deploy.yml` oluşturun:

```yaml
name: Deploy to FTP

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          PUBLIC_SITE_URL: ${{ secrets.PUBLIC_SITE_URL }}
          PUBLIC_YT_API_KEY: ${{ secrets.PUBLIC_YT_API_KEY }}
          PUBLIC_YT_CHANNEL_ID: ${{ secrets.PUBLIC_YT_CHANNEL_ID }}
      
      - name: FTP Deploy
        uses: SamKirkland/FTP-Deploy-Action@4.3.3
        with:
          server: ftp.ceygame.com
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
```

GitHub Repository Settings > Secrets and variables > Actions'da secrets ekleyin.

## 📊 Post-Deploy SEO Görevleri

Deploy sonrası SEO için:

1. **Google Search Console**
   - Sitemap gönderin: `https://ceygame.com/sitemap-index.xml`
   - Indexing isteyin: URL Inspection > Request Indexing

2. **Bing Webmaster Tools**
   - Site ekleyin ve sitemap gönderin

3. **Social Media**
   - Facebook/Discord link önizlemesini test edin
   - Twitter Card validator kullanın

4. **Analytics**
   - Google Analytics veya alternatif analytics ekleyin
   - Ilk ziyaretçileri takip edin

## 🆘 Destek

Sorun yaşıyorsanız:
- README.md'deki troubleshooting bölümüne bakın
- Hosting sağlayıcınızın desteğine başvurun
- [ceygame.com/contact](https://ceygame.com/contact) üzerinden iletişime geçin

---

**Son Güncelleme:** 2 Ocak 2025


# 🎨 Admin Panel Kurulum Rehberi

Ceygame web sitesi **Decap CMS** (eski adıyla Netlify CMS) ile tam özellikli bir admin paneline sahip!

## 📋 Özellikler

✅ **Blog Yönetimi** - Yazı ekle, düzenle, sil
✅ **Markdown Editor** - WYSIWYG editör
✅ **Medya Yönetimi** - Görsel upload
✅ **Canlı Önizleme** - Yazdıkça görün
✅ **Git Tabanlı** - Tüm değişiklikler Git'e commit
✅ **Tamamen Ücretsiz** - Backend gerektirmez

## 🚀 Local Development (Test için)

### 1. Admin Panele Erişim

Local'de test etmek için iki terminal açın:

**Terminal 1 - Web sitesi:**
```bash
npm run dev
```

**Terminal 2 - CMS backend:**
```bash
npm run cms
```

Sonra tarayıcıda:
```
http://localhost:4323/admin
```

### 2. Local'de Giriş

Local development'ta **"Login with Netlify Identity"** butonuna basın.
Otomatik olarak local mode'da çalışacak (auth gerekmez).

## 🌐 Production Deployment (Netlify)

Production'da kullanmak için Netlify'da hosting yapmanız gerekir (ücretsiz!):

### Adım 1: GitHub'a Push

```bash
git add .
git commit -m "Admin panel eklendi"
git push origin main
```

### Adım 2: Netlify'da Site Oluştur

1. [Netlify](https://www.netlify.com/) hesabı açın (ücretsiz)
2. **"Add new site" > "Import an existing project"**
3. GitHub repo'nuzu seçin
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Deploy site**

### Adım 3: Netlify Identity Aktifleştir

1. Site dashboard'da **"Identity"** sekmesine gidin
2. **"Enable Identity"** butonuna tıklayın

### Adım 4: Git Gateway Aktifleştir

1. Identity sekmesinde **"Settings and usage"**
2. **"Services" > "Git Gateway"** bölümüne gidin
3. **"Enable Git Gateway"** tıklayın

### Adım 5: Kullanıcı Ekle

1. **"Identity"** sekmesinde **"Invite users"**
2. E-posta adresinizi girin
3. Gelen maildeki linke tıklayın ve şifre oluşturun

### Adım 6: Admin Panele Giriş

```
https://your-site.netlify.app/admin
```

GitHub hesabınızla giriş yapın!

## 📝 Admin Panel Kullanımı

### Blog Yazısı Ekleme

1. Admin panelde **"Blog Yazıları"** > **"New Blog Yazıları"**
2. Formu doldurun:
   - **Başlık:** Yazı başlığı
   - **Açıklama:** Kısa özet (SEO için önemli)
   - **Yayın Tarihi:** Tarih seçin
   - **Yazar:** Ceybi (default)
   - **Kapak Görseli:** Görsel yükleyin veya boş bırakın
   - **Etiketler:** Kategoriler (valorant, cs2, taktik, vb.)
   - **Taslak:** İşaretlerseniz yayınlanmaz
   - **İçerik:** Markdown ile yazın

3. **"Publish"** butonuna tıklayın
4. Otomatik olarak Git'e commit edilir
5. Netlify otomatik rebuild yapar (2-3 dakika)

### Markdown Editör İpuçları

```markdown
# Başlık 1
## Başlık 2
### Başlık 3

**Kalın yazı**
*İtalik yazı*

- Liste item 1
- Liste item 2

1. Numaralı liste
2. İkinci item

[Link](https://youtube.com)

![Görsel](gorsel.jpg)

> Alıntı

\`kod\`

\`\`\`javascript
const x = 10;
\`\`\`
```

### Medya (Görsel) Yükleme

1. **"Media"** butonuna tıklayın
2. Görseli sürükle-bırak veya seç
3. Görsel `public/blog/` klasörüne yüklenir
4. Otomatik olarak Git'e eklenir

### Site Ayarları

**"Site Ayarları" > "Genel Ayarlar"** bölümünden:
- Site başlığını
- Açıklamayı
- YouTube kanal adını

değiştirebilirsiniz.

## 🔒 Güvenlik

- ✅ Admin panel sadece yetkili kullanıcılara açık
- ✅ GitHub authentication ile güvenli
- ✅ Tüm değişiklikler Git history'de
- ✅ Rollback mümkün (Git ile geri alabilirsiniz)

## 🎯 FTP Hosting Kullanıyorsanız

Eğer Netlify yerine FTP hosting kullanıyorsanız:

1. Local'de admin paneli kullanabilirsiniz (`npm run cms`)
2. Değişiklikler local Git'e commit edilir
3. `npm run build` yapın
4. `dist/` klasörünü FTP ile yükleyin

**Dezavantaj:** Production'da admin panel çalışmaz, sadece local'de.

**Çözüm:** GitHub Actions ile otomatik FTP deploy yapabilirsiniz.

## 🆘 Sorun Giderme

### Admin panele erişilemiyor

- `public/admin/` klasörünün build'de `dist/admin/` olarak geldiğinden emin olun
- Tarayıcı console'da hata var mı kontrol edin

### Giriş yapamıyorum (Production)

- Netlify Identity aktif mi kontrol edin
- Git Gateway aktif mi kontrol edin
- Kullanıcı invite edildi mi kontrol edin

### Değişiklikler yansımıyor

- Netlify deploy log'larını kontrol edin
- Build hatasız tamamlandı mı bakın
- Cache temizleyin (Ctrl+Shift+R)

### Local CMS çalışmıyor

- Port 8081'in boş olduğundan emin olun
- `npm run cms` komutu çalışıyor mu kontrol edin
- Browser'da `http://localhost:8081` açık mı bakın

## 📚 Daha Fazla Bilgi

- [Decap CMS Dokümantasyonu](https://decapcms.org/docs/)
- [Netlify Identity Rehberi](https://docs.netlify.com/visitor-access/identity/)
- [Markdown Rehberi](https://www.markdownguide.org/)

---

**Happy Blogging! 🎮✨**


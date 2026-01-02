/**
 * Site Configuration
 * Tüm statik konfigürasyonlar burada
 */

export const SITE_CONFIG = {
  name: 'Ceygame',
  title: 'Ceygame - FPS ve Rekabetçi Oyun İçerikleri',
  description: 'Valorant, CS2, ve diğer FPS oyunlarında profesyonel içerikler, taktikler, highlight\'lar ve daha fazlası.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://ceygame.com',
  author: 'Ceygame',
  language: 'tr',
  
  // Social links
  social: {
    youtube: 'https://www.youtube.com/@Ceybi?sub_confirmation=1',
    youtubeChannelId: import.meta.env.PUBLIC_YT_CHANNEL_ID || '',
    twitter: '',
    discord: '',
    instagram: '',
    twitch: ''
  },

  // YouTube configuration
  youtube: {
    apiKey: import.meta.env.PUBLIC_YT_API_KEY || '',
    channelId: import.meta.env.PUBLIC_YT_CHANNEL_ID || '',
    defaultMaxResults: 12
  },

  // Forum configuration
  forum: {
    provider: import.meta.env.PUBLIC_FORUM_PROVIDER || 'giscus',
    giscus: {
      repo: import.meta.env.PUBLIC_GISCUS_REPO || '',
      repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID || '',
      category: import.meta.env.PUBLIC_GISCUS_CATEGORY || 'General',
      categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      theme: 'dark',
      lang: 'tr'
    },
    disqus: {
      shortname: import.meta.env.PUBLIC_DISQUS_SHORTNAME || ''
    }
  },

  // Featured playlists (manuel konfigürasyon)
  // YouTube'da oynatma listenizin URL'sinden playlist ID'sini alın
  // Örnek: https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxxxx
  // Playlist ID: PLxxxxxxxxxxxxxxxxxx kısmı
  featuredPlaylists: [
    {
      id: 'PLxxxxxxxxxxxxxxxxxx', // Buraya kendi playlist ID'nizi yazın
      title: 'Valorant İçerikleri',
      description: 'Valorant oynanış videoları, taktikler ve highlight\'lar'
    },
    {
      id: 'PLyyyyyyyyyyyyyyyyyy', // Buraya kendi playlist ID'nizi yazın
      title: 'CS2 İçerikleri',
      description: 'CS2 oynanış videoları ve profesyonel taktikler'
    },
    {
      id: 'PLzzzzzzzzzzzzzzzzzz', // Buraya kendi playlist ID'nizi yazın
      title: 'Diğer Oyunlar',
      description: 'Farklı FPS oyunlarından içerikler'
    }
  ],

  // Navigation
  navigation: [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Videolar', href: '/videos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Forum', href: '/forum' },
    { name: 'Hakkımda', href: '/about' },
    { name: 'İletişim', href: '/contact' }
  ],

  // Footer links
  footerLinks: [
    { name: 'Gizlilik Politikası', href: '/privacy' },
    { name: 'Kullanım Koşulları', href: '/terms' },
    { name: 'Hakkımda', href: '/about' },
    { name: 'İletişim', href: '/contact' }
  ]
};

/**
 * Environment variable validation
 */
export function validateEnv(): { isValid: boolean; missing: string[] } {
  const required = ['PUBLIC_SITE_URL'];
  const missing: string[] = [];

  for (const key of required) {
    if (!import.meta.env[key]) {
      missing.push(key);
    }
  }

  // YouTube API key opsiyonel ama önerilir
  if (!import.meta.env.PUBLIC_YT_API_KEY) {
    console.warn('⚠️  PUBLIC_YT_API_KEY not set. Video fetching may not work.');
  }

  return {
    isValid: missing.length === 0,
    missing
  };
}


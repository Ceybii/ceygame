/**
 * SEO Helper Functions
 * Meta tags, JSON-LD schema, OG/Twitter cards
 */

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'video.other';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  nofollow?: boolean;
}

export interface VideoSEO {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl: string;
  embedUrl: string;
}

/**
 * Site-wide Organization JSON-LD
 */
export function getOrganizationSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ceygame',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://www.youtube.com/@Ceybi',
      // Diğer sosyal medya linklerini buraya ekleyin
    ],
    description: 'FPS ve rekabetçi oyun içerikleri sunan Türkiye\'nin önde gelen oyun kanalı'
  };
}

/**
 * WebSite JSON-LD with SearchAction
 */
export function getWebsiteSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ceygame',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/videos?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * VideoObject JSON-LD for video detail pages
 */
export function getVideoObjectSchema(video: VideoSEO, siteUrl: string) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
  };

  if (video.duration) {
    schema.duration = video.duration; // ISO 8601 format: PT4M13S
  }

  return schema;
}

/**
 * BreadcrumbList JSON-LD
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Default SEO metadata
 */
export const DEFAULT_SEO: SEOMetadata = {
  title: 'Ceygame - FPS ve Rekabetçi Oyun İçerikleri',
  description: 'Valorant, CS2, ve diğer FPS oyunlarında profesyonel içerikler, taktikler, highlight\'lar ve daha fazlası. Türkiye\'nin en aktif oyun topluluğuna katıl!',
  ogImage: '/og-default.png',
  ogType: 'website',
  twitterCard: 'summary_large_image'
};

/**
 * Generate page title with site suffix
 */
export function generateTitle(pageTitle?: string): string {
  if (!pageTitle) return DEFAULT_SEO.title;
  return `${pageTitle} | Ceygame`;
}

/**
 * Sanitize text for SEO (remove excessive whitespace, limit length)
 */
export function sanitizeText(text: string, maxLength: number = 160): string {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Generate canonical URL
 */
export function generateCanonical(siteUrl: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}


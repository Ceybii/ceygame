/**
 * YouTube Data API v3 Client
 * Statik hosting için client-side fetch + localStorage cache
 */

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount?: string;
  likeCount?: string;
  channelTitle: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
}

const CACHE_KEY = 'ceygame_youtube_cache';
// Development: 5 saniye, Production: 10 dakika önerilir
const CACHE_DURATION = import.meta.env.DEV 
  ? 5 * 1000 // Development: 5 saniye (hızlı test için)
  : 10 * 60 * 1000; // Production: 10 dakika (quota koruma)

interface CacheData {
  data: any;
  timestamp: number;
}

/**
 * localStorage'dan cache okuma
 */
function getCache(key: string): any | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${key}`);
    if (!cached) return null;
    
    const { data, timestamp }: CacheData = JSON.parse(cached);
    const now = Date.now();
    
    // Cache süresi dolmuşsa null döndür
    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_KEY}_${key}`);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

/**
 * localStorage'a cache yazma
 */
function setCache(key: string, data: any): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

/**
 * ISO 8601 duration formatını human-readable'a çevir (PT4M13S -> 4:13)
 */
export function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * View count'u human-readable formata çevir (1234567 -> 1.2M)
 */
export function formatViewCount(count: string | number): string {
  const num = typeof count === 'string' ? parseInt(count) : count;
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Tarih formatla (2024-01-15T10:30:00Z -> 15 Ocak 2024)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Kanal ID'sinden Uploads Playlist ID'si oluştur (UC... -> UU...)
 */
export function getUploadsPlaylistId(channelId: string): string {
  if (channelId.startsWith('UC')) {
    return 'UU' + channelId.slice(2);
  }
  return channelId;
}

/**
 * Kanal istatistiklerini çek
 */
export interface ChannelStats {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
  channelAge: number; // Years
}

export async function fetchChannelStats(
  apiKey: string,
  channelId: string
): Promise<ChannelStats | null> {
  // Cache kontrolü
  const cacheKey = `channel_stats_${channelId}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return null;
    }

    const channel = data.items[0];
    const publishedAt = new Date(channel.snippet.publishedAt);
    const now = new Date();
    const channelAge = Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24 * 365));

    const stats: ChannelStats = {
      subscriberCount: formatViewCount(channel.statistics.subscriberCount),
      videoCount: channel.statistics.videoCount,
      viewCount: formatViewCount(channel.statistics.viewCount),
      channelAge: channelAge > 0 ? channelAge : 1
    };
    
    // Cache'e kaydet (1 saat)
    setCache(cacheKey, stats);
    
    return stats;
  } catch (error) {
    console.error('YouTube Channel Stats fetch error:', error);
    return null;
  }
}

/**
 * Kanal oynatma listelerini çek (otomatik)
 */
export async function fetchChannelPlaylists(
  apiKey: string,
  channelId: string,
  maxResults: number = 50
): Promise<YouTubePlaylist[]> {
  // Cache kontrolü
  const cacheKey = `playlists_${channelId}_${maxResults}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    const playlists: YouTubePlaylist[] = data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      itemCount: item.contentDetails.itemCount
    }));
    
    // Cache'e kaydet
    setCache(cacheKey, playlists);
    
    return playlists;
  } catch (error) {
    console.error('YouTube Playlists fetch error:', error);
    throw error;
  }
}

/**
 * YouTube Data API v3 ile son videoları çek
 */
export async function fetchLatestVideos(
  apiKey: string,
  channelId: string,
  maxResults: number = 12
): Promise<YouTubeVideo[]> {
  // Cache kontrolü
  const cacheKey = `videos_${channelId}_${maxResults}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const uploadsPlaylistId = getUploadsPlaylistId(channelId);
    
    // 1. Playlist items al
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${apiKey}`;
    const playlistResponse = await fetch(playlistUrl);
    
    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.status}`);
    }
    
    const playlistData = await playlistResponse.json();
    const videoIds = playlistData.items
      .map((item: any) => item.contentDetails.videoId)
      .join(',');
    
    // 2. Video detayları al (duration, stats)
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl);
    
    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.status}`);
    }
    
    const videosData = await videosResponse.json();
    
    // 3. Verileri birleştir
    const videos: YouTubeVideo[] = playlistData.items.map((item: any) => {
      const videoDetail = videosData.items.find((v: any) => v.id === item.contentDetails.videoId);
      
      return {
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        publishedAt: item.snippet.publishedAt,
        duration: videoDetail ? parseDuration(videoDetail.contentDetails.duration) : '',
        viewCount: videoDetail ? formatViewCount(videoDetail.statistics.viewCount) : undefined,
        likeCount: videoDetail ? formatViewCount(videoDetail.statistics.likeCount) : undefined,
        channelTitle: item.snippet.channelTitle
      };
    });
    
    // Cache'e kaydet
    setCache(cacheKey, videos);
    
    return videos;
  } catch (error) {
    console.error('YouTube API fetch error:', error);
    throw error;
  }
}

/**
 * Tek bir video detayı çek
 */
export async function fetchVideoById(apiKey: string, videoId: string): Promise<YouTubeVideo | null> {
  const cacheKey = `video_${videoId}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return null;
    }
    
    const item = data.items[0];
    const video: YouTubeVideo = {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
      duration: parseDuration(item.contentDetails.duration),
      viewCount: formatViewCount(item.statistics.viewCount),
      likeCount: formatViewCount(item.statistics.likeCount),
      channelTitle: item.snippet.channelTitle
    };
    
    setCache(cacheKey, video);
    return video;
  } catch (error) {
    console.error('YouTube video fetch error:', error);
    return null;
  }
}

/**
 * RSS feed fallback (API key yoksa)
 * Not: CORS sorunu olabilir, bu durumda proxy gerekir
 */
export async function fetchVideosFromRSS(channelId: string): Promise<YouTubeVideo[]> {
  const cacheKey = `rss_${channelId}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // RSS feed URL
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    // Proxy kullan (CORS için) - production'da kendi proxy'nizi ekleyebilirsiniz
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      throw new Error('RSS fetch failed');
    }
    
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    
    const entries = xml.querySelectorAll('entry');
    const videos: YouTubeVideo[] = Array.from(entries).slice(0, 12).map(entry => {
      const videoId = entry.querySelector('videoId')?.textContent || '';
      const title = entry.querySelector('title')?.textContent || '';
      const thumbnail = entry.querySelector('thumbnail')?.getAttribute('url') || '';
      const published = entry.querySelector('published')?.textContent || '';
      const author = entry.querySelector('author name')?.textContent || '';
      
      return {
        id: videoId,
        title,
        description: '',
        thumbnail,
        publishedAt: published,
        duration: '',
        channelTitle: author
      };
    });
    
    setCache(cacheKey, videos);
    return videos;
  } catch (error) {
    console.error('RSS fetch error:', error);
    throw error;
  }
}


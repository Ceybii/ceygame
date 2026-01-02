/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_YT_API_KEY: string;
  readonly PUBLIC_YT_CHANNEL_ID: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_FORUM_PROVIDER: 'giscus' | 'disqus';
  readonly PUBLIC_GISCUS_REPO: string;
  readonly PUBLIC_GISCUS_REPO_ID: string;
  readonly PUBLIC_GISCUS_CATEGORY: string;
  readonly PUBLIC_GISCUS_CATEGORY_ID: string;
  readonly PUBLIC_DISQUS_SHORTNAME: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


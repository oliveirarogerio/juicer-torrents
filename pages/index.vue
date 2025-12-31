<template>
  <div>
    <Query />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const getSiteUrl = () => {
  if (process.server) {
    const envUrl = config.public.siteUrl
    if (envUrl) return envUrl
    return 'https://juicer-torrents.vercel.app'
  }
  if (typeof window !== 'undefined') {
    const envUrl = config.public.siteUrl
    if (envUrl) return envUrl
    return window.location.origin
  }
  return 'https://juicer-torrents.vercel.app'
}

const siteUrl = getSiteUrl()
const ogImageUrl = `${siteUrl}/og-image.png`

useSeoMeta({
  title: 'Big Juicer Torrents - Busca e Download de Torrents',
  description: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares. Interface moderna e fácil de usar para encontrar conteúdo rapidamente.',
  keywords: 'torrents, download, busca torrents, top 100 torrents, magnet links, torrent search',
  author: 'Big Juicer Torrents',
  robots: 'index, follow',
  ogType: 'website',
  ogTitle: 'Big Juicer Torrents - Busca e Download de Torrents',
  ogDescription: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares.',
  ogUrl: siteUrl,
  ogImage: ogImageUrl,
  ogImageAlt: 'Big Juicer Torrents - Busca e Download de Torrents',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageType: 'image/png',
  ogSiteName: 'Big Juicer Torrents',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Big Juicer Torrents - Busca e Download de Torrents',
  twitterDescription: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares.',
  twitterImage: ogImageUrl,
  twitterImageAlt: 'Big Juicer Torrents - Busca e Download de Torrents',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: siteUrl,
    },
    {
      rel: 'image_src',
      href: ogImageUrl,
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Big Juicer Torrents',
        description: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares.',
        url: siteUrl,
        image: ogImageUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}?query={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Big Juicer Torrents',
        url: siteUrl,
        description: 'Plataforma de busca de torrents com interface moderna e intuitiva',
        logo: ogImageUrl,
      }),
    },
  ],
})
</script>

<style scoped>
body {
  background-color: purple;
}
</style>

<template>
  <div>
    <Query />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const siteUrl = computed(() => {
  if (process.server) {
    return config.public.siteUrl || 'https://juicer-torrents.vercel.app'
  }
  if (process.client && typeof window !== 'undefined') {
    return config.public.siteUrl || window.location.origin
  }
  return 'https://juicer-torrents.vercel.app'
})

const ogImageUrl = computed(() => {
  const baseUrl = siteUrl.value
  return `${baseUrl}/og-image.png`
})

useSeoMeta({
  title: 'Big Juicer Torrents - Busca e Download de Torrents',
  description: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares. Interface moderna e fácil de usar para encontrar conteúdo rapidamente.',
  keywords: 'torrents, download, busca torrents, top 100 torrents, magnet links, torrent search',
  author: 'Big Juicer Torrents',
  robots: 'index, follow',
  ogType: 'website',
  ogTitle: 'Big Juicer Torrents - Busca e Download de Torrents',
  ogDescription: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares.',
  ogUrl: siteUrl.value,
  ogImage: ogImageUrl.value,
  ogImageAlt: 'Big Juicer Torrents - Busca e Download de Torrents',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageType: 'image/png',
  ogSiteName: 'Big Juicer Torrents',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Big Juicer Torrents - Busca e Download de Torrents',
  twitterDescription: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares.',
  twitterImage: ogImageUrl.value,
  twitterImageAlt: 'Big Juicer Torrents - Busca e Download de Torrents',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: siteUrl.value,
    },
    {
      rel: 'image_src',
      href: ogImageUrl.value,
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
        url: siteUrl.value,
        image: ogImageUrl.value,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl.value}?query={search_term_string}`,
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
        url: siteUrl.value,
        description: 'Plataforma de busca de torrents com interface moderna e intuitiva',
        logo: ogImageUrl.value,
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

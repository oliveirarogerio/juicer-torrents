<template>
  <div>
    <Query />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl || 'https://bigjuicer-torrents.com'

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
  ogImage: `${siteUrl}/og-image.jpg`,
  ogSiteName: 'Big Juicer Torrents',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Big Juicer Torrents - Busca e Download de Torrents',
  twitterDescription: 'Busque e encontre os melhores torrents. Explore o Top 100 dos torrents mais populares.',
  twitterImage: `${siteUrl}/og-image.jpg`,
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: siteUrl,
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

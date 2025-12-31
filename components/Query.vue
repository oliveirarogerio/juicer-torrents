<template>
  <div
    class="bg-black fixed inset-0 flex flex-col items-center text-green-500 overflow-hidden"
  >
    <div class="pixel-art text-[40px] md:text-[50px] mt-8 mb-4 animate-fade-in">
      Big Juicer Torrents
    </div>

    <div class="w-full max-w-4xl px-4 flex flex-col" style="height: calc(100vh - 180px); max-height: calc(100vh - 180px);">
      <UTabs
        v-model="selectedTab"
        :items="tabs"
        class="w-full flex-1 flex flex-col"
        :ui="{
          list: {
            background: 'bg-black',
            marker: {
              background: 'bg-green-500',
            },
            tab: {
              base: 'text-green-500',
              active: 'text-black',
              inactive: 'text-green-500 hover:text-green-400',
            },
          },
        }"
      >
        <template #search>
          <div class="flex flex-col" style="height: calc(100vh - 280px);">
            <div class="flex flex-row items-center w-full mb-4">
              <UInput
                variant="none"
                v-model="searchQuery"
                @keyup.enter="search"
                placeholder="Digite sua busca"
                class="flex-grow bg-black border border-green-500 text-green-500 rounded-lg p-2 focus:ring-2 focus:ring-green-500 transition"
              />
              <UButton
                @click="search"
                :disabled="!searchQuery.trim()"
                class="rounded ml-2 bg-green-500 hover:bg-green-600 text-black font-bold p-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                icon="i-heroicons-magnifying-glass"
              />
            </div>

            <div
              v-if="searchLoading"
              class="text-green-400 font-semibold text-center animate-pulse"
            >
              Carregando...
            </div>

            <div
              v-if="searchResults.length"
              class="bg-black border border-green-500 rounded-lg p-4 overflow-y-auto shadow-md"
              style="max-height: calc(100vh - 380px);"
            >
              <div class="space-y-3">
                <div
                  v-for="(result, index) in searchResults"
                  :key="result.title"
                  class="bg-gray-800 hover:bg-gray-700 text-green-400 rounded-lg p-4 transition"
                >
                  <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div class="flex-grow">
                      <div class="font-bold text-lg mb-2">{{ result.title }}</div>
                      <div class="text-sm space-y-1 text-green-300">
                        <div v-if="result.size" class="flex items-center gap-2">
                          <span class="text-green-500">📦</span>
                          <span>Tamanho: {{ formatSize(result.size) }}</span>
                        </div>
                        <div v-if="result.seeders !== undefined || result.leechers !== undefined" class="flex items-center gap-4">
                          <span v-if="result.seeders !== undefined" class="flex items-center gap-1">
                            <span class="text-green-500">⬆️</span>
                            <span>Seeds: {{ result.seeders }}</span>
                          </span>
                          <span v-if="result.leechers !== undefined" class="flex items-center gap-1">
                            <span class="text-red-500">⬇️</span>
                            <span>Leechers: {{ result.leechers }}</span>
                          </span>
                        </div>
                        <div v-if="result.uploadDate" class="flex items-center gap-2">
                          <span class="text-green-500">📅</span>
                          <span>Data: {{ result.uploadDate }}</span>
                        </div>
                        <div v-if="result.uploader" class="flex items-center gap-2">
                          <span class="text-green-500">👤</span>
                          <span>Uploader: {{ result.uploader }}</span>
                        </div>
                      </div>
                    </div>
                    <UButton
                      @click="copyToClipboard(result.torrentLink || result.magnetLink, index, 'search')"
                      :class="[
                        'p-2 rounded shadow-md font-bold whitespace-nowrap transition-all duration-300',
                        copiedIndex === index && copiedTab === 'search'
                          ? 'bg-blue-500 text-white scale-110'
                          : 'bg-green-500 hover:bg-green-600 text-black'
                      ]"
                    >
                      {{ copiedIndex === index && copiedTab === 'search' ? '✓ Copiado!' : 'Copiar Link' }}
                    </UButton>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="!searchLoading && searchResults.length === 0 && hasSearched"
              class="text-gray-500 text-center mt-4"
            >
              Nenhum resultado encontrado.
            </div>
          </div>
        </template>

        <template #top100>
          <div class="flex flex-col" style="height: calc(100vh - 280px);">
            <div
              v-if="top100Loading"
              class="text-green-400 font-semibold text-center animate-pulse mb-4"
            >
              Carregando Top 100...
            </div>

            <div
              v-if="top100Results.length"
              class="bg-black border border-green-500 rounded-lg p-4 overflow-y-auto shadow-md"
              style="max-height: calc(100vh - 320px);"
            >
              <div class="space-y-3">
                <div
                  v-for="(result, index) in top100Results"
                  :key="result.title"
                  class="bg-gray-800 hover:bg-gray-700 text-green-400 rounded-lg p-4 transition"
                >
                  <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div class="flex-grow">
                      <div class="font-bold text-lg mb-2">
                        <span class="text-green-500 mr-2">#{{ index + 1 }}</span>
                        {{ result.title }}
                      </div>
                      <div class="text-sm space-y-1 text-green-300">
                        <div v-if="result.size" class="flex items-center gap-2">
                          <span class="text-green-500">📦</span>
                          <span>Tamanho: {{ formatSize(result.size) }}</span>
                        </div>
                        <div v-if="result.seeders !== undefined || result.leechers !== undefined" class="flex items-center gap-4">
                          <span v-if="result.seeders !== undefined" class="flex items-center gap-1">
                            <span class="text-green-500">⬆️</span>
                            <span>Seeds: {{ result.seeders }}</span>
                          </span>
                          <span v-if="result.leechers !== undefined" class="flex items-center gap-1">
                            <span class="text-red-500">⬇️</span>
                            <span>Leechers: {{ result.leechers }}</span>
                          </span>
                        </div>
                        <div v-if="result.uploadDate" class="flex items-center gap-2">
                          <span class="text-green-500">📅</span>
                          <span>Data: {{ result.uploadDate }}</span>
                        </div>
                        <div v-if="result.uploader" class="flex items-center gap-2">
                          <span class="text-green-500">👤</span>
                          <span>Uploader: {{ result.uploader }}</span>
                        </div>
                      </div>
                    </div>
                    <UButton
                      @click="copyToClipboard(result.torrentLink || result.magnetLink, index, 'top100')"
                      :class="[
                        'p-2 rounded shadow-md font-bold whitespace-nowrap transition-all duration-300',
                        copiedIndex === index && copiedTab === 'top100'
                          ? 'bg-blue-500 text-white scale-110'
                          : 'bg-green-500 hover:bg-green-600 text-black'
                      ]"
                    >
                      {{ copiedIndex === index && copiedTab === 'top100' ? '✓ Copiado!' : 'Copiar Link' }}
                    </UButton>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="!top100Loading && top100Results.length === 0"
              class="text-gray-500 text-center mt-4"
            >
              Erro ao carregar Top 100.
            </div>
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const { searchTorrents, getTop100, formatSize } = useTorrentApi();
const toast = useToast();

const selectedTab = ref(0);
const tabs = [
  {
    key: "search",
    label: "Busca",
    slot: "search",
  },
  {
    key: "top100",
    label: "Top 100",
    slot: "top100",
  },
];

const searchQuery = ref("");
const searchResults = ref([]);
const searchLoading = ref(false);
const hasSearched = ref(false);

const top100Results = ref([]);
const top100Loading = ref(false);

const copiedIndex = ref(null);
const copiedTab = ref(null);

const search = async () => {
  if (!searchQuery.value.trim()) return;

  searchLoading.value = true;
  searchResults.value = [];
  hasSearched.value = true;

  try {
    const results = await searchTorrents(searchQuery.value);
    searchResults.value = results;
  } catch (err) {
    console.error("Error searching:", err);
  } finally {
    searchLoading.value = false;
  }
};

const loadTop100 = async () => {
  top100Loading.value = true;
  top100Results.value = [];

  try {
    const results = await getTop100();
    top100Results.value = results;
  } catch (err) {
    console.error("Error loading top 100:", err);
  } finally {
    top100Loading.value = false;
  }
};

watch(selectedTab, (newTab) => {
  if (newTab === 1 && top100Results.value.length === 0) {
    loadTop100();
  }
});

const copyToClipboard = (text, index, tab) => {
  if (!text) {
    toast.add({
      title: "Link não disponível!",
      color: "red",
      icon: "i-heroicons-exclamation-circle",
    });
    return;
  }

  copiedIndex.value = index;
  copiedTab.value = tab;

  navigator.clipboard.writeText(text).then(
    () => {
      toast.add({
        title: "Link copiado!",
        description: "Link copiado para a área de transferência",
        color: "green",
        icon: "i-heroicons-check-circle",
      });

      setTimeout(() => {
        copiedIndex.value = null;
        copiedTab.value = null;
      }, 1500);
    },
    (err) => {
      toast.add({
        title: "Erro ao copiar",
        description: err.toString(),
        color: "red",
        icon: "i-heroicons-exclamation-circle",
      });
      copiedIndex.value = null;
      copiedTab.value = null;
    }
  );
};
</script>

<style scoped>
.pixel-art {
  font-family: "Pixelify Sans", sans-serif;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #149414;
}

.animate-fade-in {
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

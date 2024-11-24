<template>
  <div class="bg-black fixed inset-0 flex flex-col items-center justify-center text-green-500 overflow-hidden">
    <div class="pixel-art text-[40px] md:text-[50px] mt-8 mb-4 animate-fade-in">
      Big Juicer Torrents
    </div>

    <div class="w-full max-w-2xl flex flex-col items-center sticky top-0 bg-black z-10 pb-4">
      <div class="flex flex-row items-center w-full px-4">
        <UInput
          v-model="searchQuery"
          @keyup.enter="search"
          placeholder="Digite sua busca"
          class="flex-grow bg-black border border-green-500 text-green-500 rounded-lg p-2 outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <UButton
          @click="search"
          class="rounded ml-2 bg-green-500 hover:bg-green-600 text-black font-bold p-2 shadow-md"
          icon="i-heroicons-magnifying-glass"
        />
      </div>

      <div v-if="loading" class="text-green-400 font-semibold mt-2 animate-pulse">
        Carregando...
      </div>
    </div>

    <div v-if="results.length" class="w-full max-w-2xl flex-grow bg-black border border-green-500 rounded-lg p-4 overflow-y-auto shadow-md" style="max-height: 60vh;">
      <ul>
        <li v-for="result in results" :key="result.title" class="flex justify-between items-center bg-gray-800 hover:bg-gray-700 text-green-400 rounded-lg py-2 px-4 mb-2 transition">
          <div class="truncate w-2/3">
            <span class="font-bold">{{ result.title }}</span>
          </div>
          <UButton
            @click="copyToClipboard(result.torrentLink)"
            class="ml-4 bg-green-500 hover:bg-green-600 text-black p-2 rounded shadow-md font-bold"
          >
            Copiar
          </UButton>
        </li>
      </ul>
    </div>

    <div v-if="!loading && !results.length && searchQuery" class="text-gray-500 mt-4">
      Nenhum resultado encontrado.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const searchQuery = ref("");
const results = ref([]);
const loading = ref(false);
const error = ref(null);

const search = async () => {
  loading.value = true;
  error.value = null;
  results.value = [];

  try {
    const response = await axios.get(`https://thepirateapi.fly.dev/search?query=${searchQuery.value}`);
    results.value = response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Link copiado para a área de transferência!");
    },
    (err) => {
      alert("Erro ao copiar o link: " + err);
    }
  );
};
</script>

<style scoped>
.pixel-art {
  font-family: "Courier New", Courier, monospace;
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

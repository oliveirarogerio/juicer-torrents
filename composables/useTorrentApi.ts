export interface Torrent {
  title: string;
  torrentLink: string;
  magnetLink?: string;
  size?: string;
  seeders?: number;
  leechers?: number;
  uploadDate?: string;
  category?: string;
  uploader?: string;
}

export const useTorrentApi = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.pirateApiUrl;

  const searchTorrents = async (query: string, page: number = 1): Promise<Torrent[]> => {
    try {
      const response = await $fetch<Torrent[]>(`${apiUrl}search`, {
        params: { query, page },
      });
      return response || [];
    } catch (error) {
      console.error('Error searching torrents:', error);
      throw error;
    }
  };

  const getTop100 = async (): Promise<Torrent[]> => {
    try {
      const response = await $fetch<Torrent[]>(`${apiUrl}100`);
      return response || [];
    } catch (error) {
      console.error('Error fetching top 100:', error);
      throw error;
    }
  };

  const formatSize = (size: string | undefined): string => {
    if (!size) return 'N/A';

    const sizeStr = size.toLowerCase();
    if (sizeStr.includes('gib') || sizeStr.includes('gb')) {
      return size;
    }
    if (sizeStr.includes('mib') || sizeStr.includes('mb')) {
      return size;
    }
    if (sizeStr.includes('kib') || sizeStr.includes('kb')) {
      return size;
    }

    const bytes = parseFloat(size);
    if (isNaN(bytes)) return size;

    if (bytes >= 1073741824) {
      return (bytes / 1073741824).toFixed(2) + ' GB';
    }
    if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(2) + ' MB';
    }
    if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    }
    return bytes + ' B';
  };

  return {
    searchTorrents,
    getTop100,
    formatSize,
  };
};


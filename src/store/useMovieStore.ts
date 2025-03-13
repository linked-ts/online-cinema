// src/store/useMovieStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  fetchMovies,
  fetchGenres,
  fetchMovieDetails,
  fetchMoviesByGenre,
  fetchTVSeries,
  fetchTVGenres,
  fetchTVDetails,
  fetchTVSeriesByGenre,
  searchMulti,
} from '@/services/api';
import { Movie, Genre, TVSeries, Media } from '@/types/movie';

interface MovieState {
  movies: Movie[];
  genres: Genre[];
  tvSeries: TVSeries[];
  tvGenres: Genre[];
  filteredTVSeries: TVSeries[];
  movieDetails: Media | null;
  searchQuery: string;
  searchResults: Media[];
  filteredMovies: Movie[];
  watchlist: Media[];
  favorites: Media[]; // New favorites array
  selectedGenre: Genre | null;
  loading: boolean;
  error: string | null;

  fetchMovies: (page?: number) => Promise<void>;
  fetchGenres: () => Promise<void>;
  fetchMoviesByGenre: (genreId: number, page?: number) => Promise<void>;
  fetchTVSeries: (page?: number) => Promise<void>;
  fetchTVGenres: () => Promise<void>;
  fetchTVSeriesByGenre: (genreId: number, page?: number) => Promise<void>;
  fetchMovieDetails: (id: number) => Promise<void>;
  fetchTVDetails: (id: number) => Promise<void>;
  setSearchQuery: (query: string) => Promise<void>;
  setSelectedGenre: (genre: Genre | null) => void;
  addToWatchlist: (item: Media) => void;
  removeFromWatchlist: (id: number) => void;
  addToFavorites: (item: Media) => void; // New action
  removeFromFavorites: (id: number) => void; // New action
  clearError: () => void;
}

export const useMovieStore = create(
  persist<MovieState>(
    (set, get) => ({
      movies: [],
      genres: [],
      tvSeries: [],
      tvGenres: [],
      filteredTVSeries: [],
      movieDetails: null,
      searchQuery: '',
      searchResults: [],
      filteredMovies: [],
      watchlist: [],
      favorites: [], // Initialize favorites array
      selectedGenre: null,
      loading: false,
      error: null,

      fetchMovies: async (page: number = 1) => {
        console.log('fetchMovies: Starting for page', page);
        set({ loading: true, error: null, selectedGenre: null });
        try {
          const movies = await fetchMovies(page);
          console.log('fetchMovies: Successfully fetched movies', movies);
          set({ movies, filteredMovies: movies });
          if (page === 1 && movies.length > 0) {
            console.log('fetchMovies: Fetching details for movie ID', movies[0].id);
            await get().fetchMovieDetails(movies[0].id);
            console.log('fetchMovies: Successfully fetched movie details');
          }
          set({ loading: false });
          console.log('fetchMovies: Completed');
        } catch (error) {
          console.error('fetchMovies: Error', error);
          set({ error: 'Failed to fetch movies', loading: false });
        }
      },

      fetchGenres: async () => {
        console.log('fetchGenres: Starting');
        set({ loading: true, error: null });
        try {
          const genres = await fetchGenres();
          console.log('fetchGenres: Successfully fetched genres', genres);
          set({ genres, loading: false });
          console.log('fetchGenres: Completed');
        } catch (error) {
          console.error('fetchGenres: Error', error);
          set({ error: 'Failed to fetch genres', loading: false });
        }
      },

      fetchMoviesByGenre: async (genreId: number, page: number = 1) => {
        set({ loading: true, error: null });
        try {
          const movies = await fetchMoviesByGenre(genreId, page);
          const currentMovies = get().filteredMovies || [];
          set({
            movies,
            filteredMovies: page === 1 ? movies : [...currentMovies, ...movies],
            loading: false,
          });
          const genre = get().genres.find((g) => g.id === genreId);
          set({ selectedGenre: genre || null });
        } catch (error) {
          console.error('Error in fetchMoviesByGenre:', error);
          set({ error: 'Failed to fetch movies by genre', loading: false });
        }
      },

      fetchTVSeries: async (page: number = 1) => {
        set({ loading: true, error: null });
        try {
          const tvSeries = await fetchTVSeries(page);
          set({ tvSeries, loading: false });
        } catch (error) {
          console.error('Error in fetchTVSeries:', error);
          set({ error: 'Failed to fetch TV series', loading: false });
        }
      },

      fetchTVGenres: async () => {
        set({ loading: true, error: null });
        try {
          const tvGenres = await fetchTVGenres();
          set({ tvGenres, loading: false });
        } catch (error) {
          console.error('Error in fetchTVGenres:', error);
          set({ error: 'Failed to fetch TV genres', loading: false });
        }
      },

      fetchTVSeriesByGenre: async (genreId: number, page: number = 1) => {
        set({ loading: true, error: null });
        try {
          const tvSeries = await fetchTVSeriesByGenre(genreId, page);
          const currentTVSeries = get().filteredTVSeries || [];
          set({
            filteredTVSeries: page === 1 ? tvSeries : [...currentTVSeries, ...tvSeries],
            loading: false,
          });
          const genre = get().tvGenres.find((g) => g.id === genreId);
          set({ selectedGenre: genre || null });
        } catch (error) {
          console.error('Error in fetchTVSeriesByGenre:', error);
          set({ error: 'Failed to fetch TV series by genre', loading: false });
        }
      },

      fetchMovieDetails: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const movieDetails = await fetchMovieDetails(id);
          set({ movieDetails, loading: false });
        } catch (error) {
          console.error('Error in fetchMovieDetails:', error);
          set({ error: 'Failed to fetch movie details', loading: false });
        }
      },

      fetchTVDetails: async (id: number) => {
        set({ loading: true, error: null });
        try {
          const tvDetails = await fetchTVDetails(id);
          set({ movieDetails: tvDetails, loading: false });
        } catch (error) {
          console.error('Error in fetchTVDetails:', error);
          set({ error: 'Failed to fetch TV details', loading: false });
        }
      },

      // src/store/useMovieStore.ts (relevant section)
      setSearchQuery: async (query: string) => {
        console.log('setSearchQuery: Starting with query', query);
        set({ loading: true, error: null, searchQuery: query });
        try {
          if (query.trim()) {
            console.log('setSearchQuery: Calling searchMulti with query', query);
            const results = await searchMulti(query);
            console.log('setSearchQuery: Received search results', results);
            set({ searchResults: results, loading: false });
          } else {
            set({ searchResults: [], loading: false });
          }
        } catch (error) {
          console.error('setSearchQuery: Error', error);
          set({ error: 'Failed to search', loading: false, searchResults: [] });
        }
      },

      setSelectedGenre: (genre: Genre | null) => {
        set({ selectedGenre: genre });
        if (!genre) {
          set({ filteredMovies: get().movies });
        }
      },

      addToWatchlist: (item: Media) => {
        set({ loading: true, error: null });
        try {
          const watchlist = get().watchlist;
          const existingItem = watchlist.find((m) => m.id === item.id);
          if (!existingItem) {
            set({ watchlist: [...watchlist, item] });
          }
        } catch (error) {
          console.error('Error in addToWatchlist:', error);
          set({ error: 'Failed to add to watchlist', loading: false });
        } finally {
          set({ loading: false });
        }
      },

      removeFromWatchlist: (id: number) => {
        set({ loading: true, error: null });
        try {
          const watchlist = get().watchlist;
          set({ watchlist: watchlist.filter((m) => m.id !== id) });
        } catch (error) {
          console.error('Error in removeFromWatchlist:', error);
          set({ error: 'Failed to remove from watchlist', loading: false });
        } finally {
          set({ loading: false });
        }
      },

      addToFavorites: (item: Media) => {
        set({ loading: true, error: null });
        try {
          const favorites = get().favorites;
          const existingItem = favorites.find((m) => m.id === item.id);
          if (!existingItem) {
            set({ favorites: [...favorites, item] });
          }
        } catch (error) {
          console.error('Error in addToFavorites:', error);
          set({ error: 'Failed to add to favorites', loading: false });
        } finally {
          set({ loading: false });
        }
      },

      removeFromFavorites: (id: number) => {
        set({ loading: true, error: null });
        try {
          const favorites = get().favorites;
          set({ favorites: favorites.filter((m) => m.id !== id) });
        } catch (error) {
          console.error('Error in removeFromFavorites:', error);
          set({ error: 'Failed to remove from favorites', loading: false });
        } finally {
          set({ loading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'movie-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
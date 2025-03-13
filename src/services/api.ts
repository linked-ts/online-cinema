// src/services/api.ts
import axios from 'axios';
import { Movie, Genre, TVSeries, Media } from '@/types/movie';

// Create an Axios instance with TMDB base URL and API key
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  },
});



export const fetchMoviesByGenre = async (genreId: number, page: number = 1): Promise<Movie[]> => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        language: 'en-US',
        page,
        with_genres: genreId,
      },
    });
    return response.data.results.map((movie: any) => ({
      ...movie,
      media_type: 'movie',
    }));
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw new Error('Failed to fetch movies by genre');
  }
};

export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/popular', {
      params: {
        language: 'en-US',
        page,
      },
    });
    return response.data.results.map((movie: any) => ({
      ...movie,
      media_type: 'movie',
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};

export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get('/genre/movie/list', {
      params: {
        language: 'en-US',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres');
  }
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  try {
    const response = await api.get(`/movie/${id}`, {
      params: {
        language: 'en-US',
        append_to_response: 'videos,credits',
      },
    });
    return { ...response.data, media_type: 'movie' };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
};

export const fetchTVSeries = async (page: number = 1): Promise<TVSeries[]> => {
  try {
    const response = await api.get('/tv/popular', {
      params: {
        language: 'en-US',
        page,
      },
    });
    return response.data.results.map((series: any) => ({
      ...series,
      media_type: 'tv',
    }));
  } catch (error) {
    console.error('Error fetching TV series:', error);
    throw new Error('Failed to fetch TV series');
  }
};

export const fetchTVGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get('/genre/tv/list', {
      params: {
        language: 'en-US',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    throw new Error('Failed to fetch TV genres');
  }
};

export const fetchTVDetails = async (id: number): Promise<TVSeries> => {
  try {
    const response = await api.get(`/tv/${id}`, {
      params: {
        language: 'en-US',
        append_to_response: 'videos,credits',
      },
    });
    return { ...response.data, media_type: 'tv' };
  } catch (error) {
    console.error('Error fetching TV details:', error);
    throw new Error('Failed to fetch TV details');
  }
};

export const fetchTVSeriesByGenre = async (genreId: number, page: number = 1): Promise<TVSeries[]> => {
  try {
    const response = await api.get('/discover/tv', {
      params: {
        language: 'en-US',
        page,
        with_genres: genreId,
      },
    });
    return response.data.results.map((series: any) => ({
      ...series,
      media_type: 'tv',
    }));
  } catch (error) {
    console.error('Error fetching TV series by genre:', error);
    throw new Error('Failed to fetch TV series by genre');
  }
};

// Добавляем недостающую функцию searchMulti
export const searchMulti = async (query: string, page: number = 1): Promise<Media[]> => {
  try {
    const response = await api.get('/search/multi', {
      params: {
        language: 'en-US',
        query,
        page,
        include_adult: false,
      },
    });
    return response.data.results.map((item: any) => ({
      ...item,
      media_type: item.media_type || (item.title ? 'movie' : 'tv'), // Устанавливаем media_type, если не указано
    }));
  } catch (error) {
    console.error('Error searching media:', error);
    throw new Error('Failed to search media');
  }
};

export default api;
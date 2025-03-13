// src/types/movie.ts
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official?: boolean;
  published_at?: string;
}

interface BaseMedia {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
  genres?: Array<{ id: number; name: string }>;
  videos?: { results: Video[] };
  credits?: { cast: Array<{ name: string; character: string }> };
  similar?: { results: Media[] };
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
}

export interface Movie extends BaseMedia {
  media_type: 'movie';
  title: string;
  release_date: string;
  runtime?: number; // Ensure runtime is optional
}

export interface TVSeries extends BaseMedia {
  media_type: 'tv';
  name: string;
  first_air_date: string;
  number_of_seasons?: number; // Ensure number_of_seasons is optional
}

export type Media = Movie | TVSeries;

export interface Genre {
  id: number;
  name: string;
}
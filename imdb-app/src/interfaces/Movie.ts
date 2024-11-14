export interface MovieData {
  name: string;
  description: string;
  director: string;
  genre: string;
}

export interface Movie extends MovieData {
  id: number;
}

export interface MovieDetail extends MovieData {
  id: number;
  rating: number;
}
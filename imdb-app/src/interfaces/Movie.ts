export interface MovieData {
  name: string;
  description: string;
  director: string;
  genre: string;
}

export interface Movie extends MovieData {
  id: number;
}
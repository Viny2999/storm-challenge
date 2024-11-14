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

export enum MovieGenre {
  ACTION = 'Action',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  SCIENCE_FICTION = 'Science Fiction',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  ANIMATION = 'Animation',
  DOCUMENTARY = 'Documentary',
  THRILLER = 'Thriller',
  FANTASY = 'Fantasy'
}

export interface MovieFilter {
  name?: string;
  director?: string;
  genre?: MovieGenre;
}
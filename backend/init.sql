-- Criação do tipo enum para a coluna 'role'
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
    CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'USER');
  END IF;
END $$;

-- Creation of the enum type for the 'genre' column
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'movie_genre_enum') THEN
    CREATE TYPE movie_genre_enum AS ENUM (
      'Action', 'Comedy', 'Drama', 'Science Fiction', 'Horror', 
      'Romance', 'Animation', 'Documentary', 'Thriller', 'Fantasy'
    );
  END IF;
END $$;

-- Criação da tabela 'users' com a coluna 'role' usando o tipo enum
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  status BOOLEAN NOT NULL DEFAULT TRUE,
  role user_role_enum NOT NULL DEFAULT 'USER'
);

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  director VARCHAR(255),
  genre movie_genre_enum NOT NULL
);

-- Table for user ratings on movies
CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  rating INT CHECK (rating BETWEEN 0 AND 4),
  rating_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (movie_id) REFERENCES movies (id),
  UNIQUE (user_id, movie_id)
);

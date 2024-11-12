-- Criação do tipo enum para a coluna 'role'
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
    CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'USER');
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

# storm-challenge

Projeto feito em Node usando Express e React usando Typescript.

## Decisões Técnicas
Escolhi usar express no backend pela simplicidade da solução e velocidade.

E no frontend usei apenas React Puro.

Criei os dois projetos em monorepo para facilitar a execução do teste localmente.

## Como Executar
```
docker compose up -d
```
O Docker subirá 3 containers:
  * Banco de Dados Postgres (com criação das tabelas e usuário admin da aplicação criados)
  * Backend -> [ACESSE](http://localhost:3000/v1/health)
  * Frontend -> [ACESSE](http://localhost:3001)

## Documentação da API
Para conhecer os métodos expostos pelo backend acesse o [Swagger](http://localhost:3000/v1/docs)

## Usuário Default
Na criação do banco de dados já é criado um usuário ADMIN default.

Email: `admin@gmail.com`

Password: `admin`

## Executando os Testes Unitários
```
cd backend
npm run test
```
# storm-challenge

Projeto feito em Node usando Express e React usando Typescript.

## Decisões Técnicas
Decidi fazer o sistema usando express pela simplicidade da solução e velocidade.

E no frontend usei apenas React Puro.

## Como Executar
```
docker compose up
```
O Docker subirá 3 containers:
  * Banco de Dados Postgres (com criação das tabelas e usuário admin da aplicação criados)
  * Backend
  * Frontend

## Documentação da API
Para conhecer os métodos expostos pelo backend acesse o Swagger em:
```
http://localhost:3000/v1/docs
```

## Usuário Default
Na criação do banco de dados já é criado um usuário ADMIN default.

Email: `admin@gmail.com`

Password: `admin`

## Executando os Testes Unitários
```
cd backend
npm run test
```
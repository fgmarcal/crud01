# Projeto CRUD com Node.js

## API de Agenda de Contatos

### Usuário
- Criar usuário
- Proteger duplicação de usuários por meio do e-mail

### Contatos
- criar contatos
- alterar contatos
- listar contatos
- apagar contatos

### Tecnologias utilizadas

- Node
- Typescript
- Prisma
- Fastify
- Sqlite

## Arquivo .env
- crie um arquivo .env na pasta mãe com os dados abaixo:
    - DATABASE_URL="file:./dev.db"

## Inicialização
1. baixe o repositório na pasta de sua escolha

    ```bash
    git clone <link>

2. instale as dependências

    ```bash
    npm install

3. acione o prisma para gerar o banco de dados

    ```bash
    npx prisma migrate dev


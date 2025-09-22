# Techman2025 API

## Tecnologias Utilizadas
- Node.js  
- Express  
- Prisma  
- MySQL  
- dotenv   
- VS Code 
- Insomnia 

## Passo a Passo para Executar

1. Clone este repositório e acesse a pasta `api`:
   ```bash
   git clone https://github.com/Bia-Vizeu/techman2025.git
   cd techman2025/api


2. Instale as dependências:

 ```bash
npm install express cors dotenv
npm install prisma -g
npx prisma init --datasource-provider mysql
```
3. Configure o banco de dados MySQL e crie um arquivo .env na raiz da pasta api:

 ```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/techman"
```

4. Execute as migrations do Prisma:
 
  ```bash
npx prisma migrate dev --name init
```

5. Inicie o servidor:

 ```bash
npx nodemon
```

6. Teste os endpoints utilizando o Insomnia ou outra ferramenta de sua preferência.
# Sistema de Pré-Matrícula Web

Este sistema permite a realização de pré-matrícula em disciplinas de cursos de graduação no ensino superior, fornecendo aos administradores do curso uma melhor gestão das disciplinas a serem ofertadas com base no interesse dos discentes.

## Indice

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Frontend](#frontend)
- [Backend](#backend)
- [Instalação e Uso](#instalação-e-uso)
- [Pessoas Autoras](#pessoas-autoras)

# Funcionalidades

1. Realização de pré-matrícula
2. Cadastro de disciplinas
3. Cadastro de turmas por semestre
4. Geração de relatórios

# Tecnologias

O sistema foi desenvolvido sobre uma arquitetura MVC.

## Frontend

Desenvolvido com o framework `React.js`, o frontend implementa exclusivamente a camda `View` da arquitetura. A estilização dos elementos visuais foi feita com `TailwindCSS`.

## Backend

Desenvolvido em `Node.js` com o framework `Express.js`, o backend atua fornecendo uma API REST segura e escalável. Ele implementa as camadas de **Controladores (Controllers)**, **Regras de Negócio (Services)** e o padrão de persistência **DAO/Modelos (Models)** para isolar o acesso ao banco de dados relacional **PostgreSQL**.

A segurança da aplicação é gerenciada por meio de criptografia de mão única (`bcrypt`) para armazenamento seguro de senhas e por controle de sessão stateless baseado em tokens `JWT (JSON Web Tokens)`. Além disso, possui *middlewares* acoplados estrategicamente para proteção de rotas e validação do escopo de acesso por perfil de usuário (Administrador vs. Aluno).

# Instalação e Uso

Para executar este projeto localmente, certifique-se de possuir o **Node.js** (v18 ou superior) e o **PostgreSQL** instalados e devidamente configurados em sua máquina.

### 1. Configuração do Banco de Dados
Abra o console do PostgreSQL ou a interface do pgAdmin e crie uma base de dados vazia para o projeto:
```sql
CREATE DATABASE pre_matricula;
```

### 2. Configuração das Variáveis de Ambiente
Navegue até a pasta `backend` e crie um arquivo chamado `.env` contendo as credenciais de acesso do seu ambiente local:
```env
PORT=3000
DB_USER=seu_usuario_postgres
DB_HOST=localhost
DB_NAME=pre_matricula
DB_PASSWORD=sua_senha_postgres
DB_PORT=5432
JWT_SECRET=sua_chave_secreta_jwt
```

### 3. Executando o Servidor (Backend)
Em um terminal dedicado, navegue até a pasta do backend, instale as dependências listadas no ecossistema e inicie o serviço:
```bash
cd backend
npm install
node src/server.js
```
> *Nota: O backend possui rotinas automatizadas que lerão o arquivo `src/config/init.sql` e criarão todas as tabelas e relacionamentos no banco de dados automaticamente no primeiro boot.*

### 4. Executando a Interface (Frontend)
Em um segundo terminal aberto paralelamente, navegue até a pasta do frontend, instale os pacotes visuais e inicialize o servidor de desenvolvimento do Vite:
```bash
cd frontend
npm install
npm run dev
```
Abra o endereço IP local gerado pelo terminal (geralmente `http://localhost:5173`) no seu navegador de preferência para interagir com o sistema.

# Pessoas Autoras

- **Ademir de Jesus Reis Júnior**
- **Alan Jeferson Marques de Melo**
- **Andreina Novaes Silva Melo**
- **Camilla Novaes Mendes**

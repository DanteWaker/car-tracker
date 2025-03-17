# Car Tracker Project

## Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- npm ou yarn instalado

### Instalação
1. Clone o repositório
2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Configuração
1. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```
BASE_URL=http://ws.lifeonline.com.br:7060/api
LOCAL_BASE_URL=http://localhost:3000/api
```

### Executando o Projeto
- Para desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

- Para produção:
```bash
npm run build
npm start
# ou
yarn build
yarn start
# ou
pnpm build
pnpm start
```
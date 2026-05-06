# StudyQuest

StudyQuest é uma plataforma pessoal de organização e gamificação de estudos que roda como site estático autossuficiente no GitHub Pages.

## O que foi feito para eliminar o erro 404

O projeto agora contém os arquivos exigidos pelo GitHub Pages em **três destinos seguros**:

- `index.html` e `404.html` na raiz, para **Deploy from a branch → main → /(root)**.
- `docs/index.html` e `docs/404.html`, para **Deploy from a branch → main → /docs** caso você prefira trocar a pasta publicada.
- `dist/index.html` e `dist/404.html`, gerados por `npm run build`, para publicação via **GitHub Actions**.

O app publicado não depende de Vite, React, `node_modules`, `/src/main.jsx` nem assets gerados. Por isso, mesmo sem instalar dependências, a página é servida pelo GitHub Pages.

## Configuração recomendada no GitHub Pages

### Opção 1 — Branch root, igual ao print

1. Faça merge/push deste código na branch `main`.
2. Vá em **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**.
4. Em **Branch**, escolha `main` e `/(root)`.
5. Clique em **Save** e aguarde alguns minutos.

### Opção 2 — Branch docs

Se o GitHub Pages continuar mostrando cache antigo:

1. Vá em **Settings → Pages**.
2. Mantenha **Deploy from a branch**.
3. Escolha `main` e `/docs`.
4. Clique em **Save**.

### Opção 3 — GitHub Actions

1. Vá em **Settings → Pages**.
2. Em **Source**, escolha **GitHub Actions**.
3. Rode o workflow **Deploy StudyQuest to GitHub Pages**.

## Testes locais

```bash
npm install
npm test
npm run build
npm run dev
```

O comando `npm install` não baixa dependências porque o app estático não precisa de pacotes externos para funcionar.

# StudyQuest

StudyQuest é uma plataforma pessoal de organização e gamificação de estudos.

## Correção do GitHub Pages

Este repositório agora possui um `index.html` estático e autossuficiente na raiz. Isso significa que a opção **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root)** funciona sem etapa de build e sem depender de pacotes externos.

Também existe um `404.html` igual ao `index.html` para evitar erro em rotas internas e um workflow opcional em `.github/workflows/deploy-pages.yml` para gerar `dist/` com `npm run build` e publicar o mesmo site usando **GitHub Actions** sem instalar dependências.

## Como publicar

### Opção mais simples: Deploy from a branch

1. Vá em **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Em **Branch**, escolha `main` e a pasta `/(root)`.
4. Clique em **Save**.
5. Aguarde alguns minutos e recarregue a URL do GitHub Pages.

### Opção alternativa: GitHub Actions

1. Vá em **Settings → Pages**.
2. Em **Source**, escolha **GitHub Actions**.
3. Rode o workflow **Deploy StudyQuest to GitHub Pages**.

## Gerar `dist/` localmente

```bash
npm run build
```

Esse comando usa apenas Node.js e copia `index.html`, `404.html` e `.nojekyll` para `dist/`, garantindo que a página sempre seja gerada.

## Desenvolvimento futuro com React/Vite

A estrutura React/Vite continua em `src/` para evolução do projeto. Se você quiser voltar ao build Vite completo depois de instalar dependências, use `npm run build:vite`. O arquivo raiz `index.html` garante que a página publicada no GitHub Pages não quebre enquanto o ambiente de build ou a configuração do Pages não estiverem prontos.

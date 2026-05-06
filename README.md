# StudyQuest

StudyQuest é uma plataforma pessoal de organização e gamificação de estudos.

## Correção definitiva do GitHub Pages

O erro `404 File not found` do GitHub Pages acontece quando a origem publicada não contém um `index.html` exatamente na pasta selecionada. Para eliminar esse problema, este repositório agora contém o app estático em três locais válidos:

- `index.html` na raiz, para **Deploy from a branch → main → /(root)**.
- `docs/index.html`, para **Deploy from a branch → main → /docs**.
- `dist/index.html`, gerado por `npm run build`, para publicação por **GitHub Actions**.

Também há `.nojekyll` na raiz, em `docs/` e no build gerado para impedir processamento do Jekyll.

## Como publicar sem erro

### Opção 1 — usando exatamente o que aparece no seu print

1. Faça merge/push deste commit na branch `main`.
2. Vá em **Settings → Pages**.
3. Em **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main`.
5. Na pasta, selecione `/(root)`.
6. Clique em **Save**.
7. Aguarde alguns minutos. O GitHub Pages pode demorar para atualizar o cache.

Essa opção usa `index.html` da raiz.

### Opção 2 — se o GitHub continuar mostrando 404 por cache/configuração

1. Vá em **Settings → Pages**.
2. Mantenha **Deploy from a branch**.
3. Em **Branch**, selecione `main`.
4. Na pasta, troque para `/docs`.
5. Clique em **Save**.

Essa opção usa `docs/index.html`, que é uma cópia do app.

### Opção 3 — usando GitHub Actions

1. Vá em **Settings → Pages**.
2. Em **Source**, escolha **GitHub Actions**.
3. Rode o workflow **Deploy StudyQuest to GitHub Pages**.

Essa opção usa `npm run build`, gera `dist/` e publica o artefato.

## Gerar `dist/` e `docs/` localmente

```bash
npm run build
```

Esse comando usa apenas Node.js e copia `index.html`, `404.html` e `.nojekyll` para `dist/` e `docs/`. Ele não depende de `npm install`.

## Desenvolvimento futuro com React/Vite

A estrutura React/Vite continua em `src/` para evolução do projeto. Se você quiser voltar ao build Vite completo depois de instalar dependências, use `npm run build:vite`.

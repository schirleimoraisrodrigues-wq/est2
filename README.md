# StudyQuest

StudyQuest é uma plataforma pessoal de organização e gamificação de estudos criada com React, Vite, Tailwind CSS e React Router.

## Rodando localmente

```bash
npm install
npm run dev
```

## Gerando a página para produção

```bash
npm run build
```

O Vite gera a página estática dentro da pasta `dist/`, incluindo o arquivo `dist/index.html` que o GitHub Pages precisa publicar.

## Publicação no GitHub Pages

Este repositório inclui o workflow `.github/workflows/deploy-pages.yml`, que instala as dependências, executa `npm run build`, copia `dist/index.html` para `dist/404.html` para funcionar com rotas do React Router e publica a pasta `dist` no GitHub Pages.

Para usar:

1. No GitHub, abra **Settings → Pages**.
2. Em **Build and deployment**, selecione **GitHub Actions** como fonte.
3. Faça push na branch `main` ou `master`, ou rode manualmente o workflow **Deploy StudyQuest to GitHub Pages**.

Isso evita o erro `404 File not found`, porque o GitHub Pages passa a receber o `index.html` gerado no build em vez de tentar servir uma pasta sem HTML publicado.

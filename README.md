# StudyQuest

StudyQuest é uma plataforma pessoal de organização e gamificação de estudos.

## Correção definitiva do GitHub Pages

O erro `404 File not found` do GitHub Pages acontece quando a origem publicada não contém um `index.html` exatamente na pasta selecionada. Para eliminar esse problema, este repositório agora contém o app estático em três locais válidos:

- `index.html` na raiz, para **Deploy from a branch → main → /(root)**.
- `docs/index.html`, para **Deploy from a branch → main → /docs**.
- `dist/index.html`, gerado por `npm run build`, para publicação por **GitHub Actions**.

Também há `.nojekyll` na raiz, em `docs/` e no build gerado para impedir processamento do Jekyll.


## Refatoração minimalista

A versão publicada foi refatorada para uma experiência mais acadêmica e objetiva:

- layout minimalista com cards simples, navegação lateral e tema claro/escuro;
- dados relacionais para matérias, tópicos, conteúdos, questões, tentativas, flashcards, eventos e provas;
- agenda com eventos vinculados a matérias e tópicos;
- página de matéria com abas de visão geral, conteúdos, questões, flashcards, arquivos, provas e desempenho;
- conteúdos com campos para texto, PDF/link de arquivo e link externo;
- sessão de questões com uma questão por vez, explicação, confiança e resumo final;
- cálculo de prioridade considerando desempenho, confiança, flashcards difíceis, revisão recente e provas próximas.


## Rodada Plantão da Engenharia

A interface agora organiza o estudo como um plantão acadêmico de engenharia, sem termos médicos literais:

- calendário com navegação por mês, botão Hoje, eventos no dia e modal de detalhes;
- painel geral com próxima prova, fila de estudos, revisões vencidas, tarefas atrasadas e prioridade crítica;
- Fila de Estudos com ações **Avaliar domínio** e **Ver teoria**;
- Mapa de Prioridades com Zona Crítica, Alta Prioridade, Atenção Moderada e Domínio Estável;
- Diagnóstico de domínio com uma questão por vez, explicação, confiança e relatório final;
- página de conteúdo com abas Teoria, Questões, Flashcards, Arquivos e Desempenho;
- Central de Cadastro com seções para matérias, tópicos, conteúdos, questões, flashcards, provas, tarefas, eventos e arquivos;
- tela de entrada no modelo de acesso com e-mail/senha e liberação imediata apenas pelo botão **Usar offline**, enquanto cadastro online não estiver ativo;
- formulários completos em modal para criar/editar dados, sem `prompt`, `alert` ou cadastro em perguntas sequenciais.

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

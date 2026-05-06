# Terminal engenharia

Terminal engenharia é uma plataforma pessoal de organização e gamificação de estudos.

## Correção definitiva do GitHub Pages

O erro `404 File not found` do GitHub Pages acontece quando a origem publicada não contém um `index.html` exatamente na pasta selecionada. Para eliminar esse problema, este repositório agora contém o app estático em três locais válidos:

- `index.html` na raiz, para **Deploy from a branch → main → /(root)**.
- `docs/index.html`, para **Deploy from a branch → main → /docs**.
- `dist/index.html`, gerado por `npm run build`, para publicação por **GitHub Actions**.

Também há `.nojekyll` na raiz, em `docs/` e no build gerado para impedir processamento do Jekyll.


## Refatoração minimalista

A versão publicada foi refatorada para uma experiência mais acadêmica e objetiva:

- layout minimalista com cards simples, navegação lateral e tema claro/escuro;
- modo noturno com paleta preta e laranja, alto contraste e menos poluição visual;
- dados relacionais para matérias, tópicos, conteúdos, questões, tentativas, flashcards, eventos e provas;
- agenda com eventos vinculados a matérias e tópicos;
- página de matéria com abas de visão geral, conteúdos, questões, flashcards, arquivos, provas e desempenho;
- conteúdos com campos para texto, PDF/link de arquivo e link externo;
- sessão de questões com uma questão por vez, explicação, confiança e resumo final;
- cálculo de prioridade considerando desempenho, confiança, flashcards difíceis, revisão recente e provas próximas.


## Rodada Terminal engenharia

A interface agora organiza o estudo como um terminal acadêmico de engenharia, sem termos médicos literais:

- calendário com navegação por mês, botão Hoje, eventos no dia e modal de detalhes;
- painel geral com próxima prova, fila de estudos, revisões vencidas, tarefas atrasadas e prioridade crítica;
- Fila de Estudos com ações **Avaliar domínio** e **Ver teoria**;
- Mapa de Prioridades com Zona Crítica, Alta Prioridade, Atenção Moderada e Domínio Estável;
- Diagnóstico de domínio com uma questão por vez, explicação, confiança e relatório final;
- página de conteúdo com abas Teoria, Questões, Flashcards, Arquivos e Desempenho;
- Central de Cadastro com seções para matérias, tópicos, conteúdos, questões, flashcards, provas, tarefas, eventos e arquivos;
- tela de entrada com e-mail, senha, erro discreto para login inválido, cadastro local em LocalStorage e botão **Entrar offline** para uso sem autenticação real;
- formulários completos em modal para criar/editar dados, sem `prompt`, `alert` ou cadastro em perguntas sequenciais.

## Acesso, cadastro local e sessão

A tela inicial agora bloqueia o painel até que o usuário escolha uma destas opções:

- **Entrar offline**: libera todas as abas usando dados locais, sem backend.
- **Fazer cadastro**: abre um formulário completo com nome, e-mail, senha e confirmação de senha, validando campos vazios e senhas diferentes.
- **Entrar**: valida o e-mail e senha cadastrados no LocalStorage. Se não encontrar usuário, mostra a mensagem `Cadastro incorreto ou usuário não encontrado.` dentro da própria tela.

No Painel Geral e no topo das demais abas há botões minimalistas para configurações, alternar tema claro/escuro e sair. O botão de sair encerra a sessão local/offline e volta para a tela de entrada.

## Correção de deploy para evitar 404

O workflow de Pages agora roda em **qualquer branch enviada ao GitHub**, não apenas em `main`/`master`. Isso é importante quando as alterações ainda estão em uma branch de trabalho ou pull request: o GitHub Pages passa a publicar o artefato gerado por `npm run build`, que contém `dist/index.html`, `dist/404.html` e os assets necessários.

Para usar a correção:

1. Vá em **Settings → Pages**.
2. Em **Source**, selecione **GitHub Actions**.
3. Faça push desta branch ou rode manualmente o workflow **Deploy Terminal engenharia to GitHub Pages**.

Se preferir **Deploy from a branch**, selecione a branch que contém este commit e a pasta `/(root)` ou `/docs`, pois ambas contêm `index.html`.

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
3. Rode o workflow **Deploy Terminal engenharia to GitHub Pages**.

Essa opção usa `npm run build`, gera `dist/` e publica o artefato.

## Gerar `dist/` e `docs/` localmente

```bash
npm run build
```

Esse comando usa apenas Node.js e copia `index.html`, `404.html` e `.nojekyll` para `dist/` e `docs/`. Ele não depende de `npm install`.

## Gerar prévia visual sem navegador

Este ambiente pode bloquear instalação de Chromium/Firefox por `apt` ou `npm`. Para evitar que a captura de tela dependa de um navegador instalado, o projeto inclui uma prévia estática em SVG gerada por Node.js puro:

```bash
npm run screenshot
```

O comando cria `screenshots/terminal-engenharia-dark-preview.svg` com a estética minimalista preta e laranja do modo noturno.

## Desenvolvimento futuro com React/Vite

A estrutura React/Vite continua em `src/` para evolução do projeto. Se você quiser voltar ao build Vite completo depois de instalar dependências, use `npm run build:vite`.

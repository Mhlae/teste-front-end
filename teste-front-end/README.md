# Econverse — storefront em React + TypeScript

Este projeto monta a home de e-commerce inspirada no layout da Econverse. A estrutura foi pensada para seguir a sequência visual solicitada: topo com benefícios, busca, categorias, hero, vitrines, banners, marcas, newsletter e footer, além do modal de produto.

## Como rodar o projeto

```bash
npm install
npm run dev -- --host 0.0.0.0
```

A aplicação fica disponível em `http://localhost:5173` normalmente.

Para produção:

```bash
npm run build
```

## Visão geral da arquitetura

A base do código está organizada em camadas bem separadas:

- `src/App.tsx`: orquestra a página principal e o estado da home
- `src/components`: blocos que compõem a interface
- `src/services/productService.ts`: camada de dados que busca produtos e faz fallback para mock local
- `src/data/products.ts`: catálogo mockado para manter o comportamento estável mesmo sem API externa
- `src/hooks`: lógicas reutilizáveis como bloqueio de scroll e fechamento com ESC
- `src/styles`: tokens, reset e temas globais em Sass
- `src/types`: definições dos modelos de produto

## Fluxo principal do código

### 1. Estado da aplicação

Em `App.tsx`, a aplicação controla:

- lista de produtos
- categoria ativa
- aba ativa de produto
- termo da busca
- contador do carrinho
- produto selecionado para abrir modal
- loading e erro da consulta

Isso mantém o componente principal como centro de orquestração da experiência, sem espalhar lógica de negócio pelos outros componentes.

### 2. Busca

A busca funciona por três critérios combinados:

- nome do produto
- descrição do produto
- categoria do produto

A lógica está dentro do `useMemo` em `App.tsx`. Quando o usuário digita no campo de busca do header, `searchQuery` atualiza e o filtro recalcula automaticamente. Isso faz com que a listagem reaja em tempo real sem precisar de reload.

### 3. Filtro por categoria e abas

A `CategoryNav` controla categorias gerais como:

- Tecnologia
- Supermercado
- Bebidas
- Ferramentas
- Saúde
- Esportes e Fitness
- Moda

Já a `ProductGrid` controla as abas internas de vitrine, como:

- CELULAR
- ACESSÓRIOS
- TABLETS
- NOTEBOOKS
- TVS
- VER TODOS

A combinação dessas duas camadas de filtro mantém a loja navegável e consistente.

Ao digitar na busca, o filtro procura no catálogo inteiro por nome, descrição ou
categoria; durante a busca, a categoria selecionada e a aba deixam de restringir
os resultados. Sem um termo de busca, as categorias filtram todas as vitrines e as
abas filtram somente a primeira vitrine.

### 4. Vitrines repetidas na home

A sequência da home foi montada em `App.tsx` para seguir o layout pedido:

1. header e navegação de categorias
2. hero
3. categorias visuais
4. primeira vitrine com abas de celulares, acessórios, tablets, notebooks, TVs e todos
5. banners de parceiros
6. segunda vitrine de produtos relacionados
7. banners de parceiros novamente
8. navegação por marcas
9. terceira vitrine de produtos relacionados
10. newsletter e footer

Essa abordagem reproduz a ordem de seções solicitada e deixa a manutenção mais
simples, porque todas as vitrines são geradas pelo mesmo componente `ProductGrid`.
As vitrines sem abas exibem o catálogo filtrado por busca e categoria, sem herdar
a aba selecionada na primeira vitrine. O link “Ver todos” seleciona a aba de todos
os produtos na primeira vitrine e leva o usuário até ela.

### 5. Modal de produto

O modal é renderizado com `createPortal` para o `document.body`. Isso permite que ele fique fora do fluxo normal do layout e não seja afetado por regras de posicionamento do container principal.

Ele foi implementado com:

- overlay escuro
- fechamento com clique fora
- fechamento com `Esc`
- foco travado dentro do modal
- retorno do foco ao botão que abriu o modal
- bloqueio do scroll do body enquanto o modal está aberto

### 6. Newsletter

A newsletter valida:

- nome mínimo de 2 caracteres
- e-mail válido
- checkbox de termos aceito

Se tudo estiver correto, a interface exibe uma mensagem de confirmação e limpa o formulário.

## Observações de implementação

- O projeto usa React 19 + TypeScript + Sass
- A fonte Poppins foi adicionada via `@fontsource/poppins`
- A camada de serviço consulta a API do teste via proxy local do Vite
- Se a API falhar, o serviço tenta uma fonte alternativa e, por último, usa o catálogo mock local
- Os dados recebidos da API do teste são produtos de tecnologia; por isso, algumas categorias e abas podem ficar sem resultados quando não houver itens correspondentes

## O que é mockado no momento

Para manter o projeto funcional e demonstrativo, alguns pontos ainda são exemplos visuais e não fluxo real de checkout ou backend:

- carrinho em modo demonstrativo
- textos promocionais em mock
- banners de parceiros e marcas apresentados como conteúdo demonstrativo
- catálogo de `src/data/products.ts`, usado somente como último fallback quando as fontes remotas falham

## Dicas de manutenção

Se quiser evoluir o projeto depois, os pontos mais naturais para mexer são:

- `src/data/products.ts` para novos produtos
- `src/services/productService.ts` para conectar API real
- `src/components/ProductGrid.tsx` para ajustar a vitrine
- `src/components/ProductModal.tsx` para novos comportamentos de compra

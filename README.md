# Teste Econverse — Front-end

### Theo Cordella

Aplicação de e-commerce desenvolvida para o teste de vaga Front-end da
Econverse. O projeto usa React, TypeScript, Vite e Sass, sem biblioteca externa
de componentes visuais.

## Requisitos

- Node.js e npm instalados.
- A aplicação fica na pasta `teste-front-end`; execute os comandos abaixo a
  partir dela.

## Instalação e execução

```bash
cd teste-front-end
npm install
npm run dev
```

O Vite informa no terminal o endereço local da aplicação (normalmente
`http://localhost:5173`).

## Comandos disponíveis

```bash
npm run dev       # inicia o servidor de desenvolvimento
npm run build     # verifica os projetos TypeScript e gera o build de produção
npm run preview   # serve localmente o build de produção
npm run lint      # executa o Oxlint
```

## Estrutura do projeto

Os arquivos da aplicação estão em `teste-front-end/src`:

- `App.tsx`: compõe as seções da página e mantém estados de produtos, busca,
  categoria, abas, carrinho, carregamento, erro e produto selecionado.
- `components/`: componentes visuais da página, incluindo `Header`,
  `ProductGrid`, `ProductCard`, `ProductModal`, `CategoryNav`,
  `PartnerBanners`, `BrandSection`, `Newsletter` e `Footer`.
- `services/`: acesso e tratamento dos dados de produtos.
- `data/`: catálogo local usado como fallback.
- `hooks/`: hooks reutilizáveis, como bloqueio de rolagem e fechamento por
  Escape do modal.
- `types/` e `utils/`: tipos compartilhados e funções utilitárias.
- `styles/`: reset, tokens, variáveis, mixins e estilos globais.

## Organização da página

A home é composta nesta ordem:

1. Header com benefícios, logo, busca, ações e navegação.
2. Hero promocional.
3. Navegação por categorias.
4. Vitrine de produtos relacionados com abas.
5. Banners de parceiros.
6. Segunda vitrine de produtos.
7. Banners de parceiros.
8. Seção “Navegue por marcas”.
9. Terceira vitrine de produtos.
10. Newsletter e footer.
11. Modal de detalhes do produto, exibido quando um produto é selecionado.

O `App.tsx` coordena os estados compartilhados: a busca filtra nome, descrição
e categoria; as categorias filtram as vitrines; as abas filtram a primeira
vitrine. A seleção de categoria no Header também atualiza o filtro e leva até a
seção de categorias.
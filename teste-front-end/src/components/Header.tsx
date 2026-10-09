import './Header.scss'
import { EconverseLogo } from './EconverseLogo'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  cartCount: number
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function ActionIcon({
  kind,
  label,
  count,
  href,
}: {
  kind: 'bag' | 'heart' | 'user' | 'cart'
  label: string
  count?: number
  href: string
}) {
  const paths = {
    bag: (
      <>
        <path d="M5 8h14l1 12H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    heart: (
      <path d="M20.8 8.8c0 4.3-8.8 10-8.8 10S3.2 13.1 3.2 8.8a4.3 4.3 0 0 1 8.8-1.1 4.3 4.3 0 0 1 8.8 1.1Z" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c.4-3.2 3.2-5 7-5s6.6 1.8 7 5" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.1 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </>
    ),
  }

  return (
    <a className="site-header__action" href={href} aria-label={label}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {paths[kind]}
        </g>
      </svg>
      {typeof count === 'number' && count > 0 && (
        <span className="site-header__count">{count}</span>
      )}
    </a>
  )
}

export function Header({
  searchQuery,
  onSearchChange,
  cartCount,
}: HeaderProps) {
  // O header reaproveita o mesmo padrão visual do e-commerce: busca principal, ações do
  // usuário e badge do carrinho. A busca é controlada por estado no componente pai para
  // manter o filtro global da página sincronizado com a entrada do usuário.
  return (
    <header className="site-header">
      <div className="site-header__inner content-width">
        <a
          className="site-header__logo-link"
          href="#inicio"
          aria-label="Econverse início"
        >
          <EconverseLogo />
        </a>

        <form
          className="site-header__search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="site-search">
            Buscar produtos
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="O que você está buscando?"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.currentTarget.value)}
          />
          <button type="submit" aria-label="Buscar">
            <SearchIcon />
          </button>
        </form>

        <div className="site-header__actions" aria-label="Minha conta e sacola">
          <ActionIcon kind="bag" label="Meus pedidos" href="#vitrine-celulares" />
          <ActionIcon kind="heart" label="Favoritos" href="#marcas" />
          <ActionIcon kind="user" label="Minha conta" href="#footer" />
          <ActionIcon
            kind="cart"
            label={`Carrinho com ${cartCount} produtos adicionados`}
            count={cartCount}
            href="#vitrine-celulares"
          />
        </div>
      </div>
    </header>
  )
}

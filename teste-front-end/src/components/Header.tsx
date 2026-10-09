import type { FC, ReactNode } from 'react'
import './Header.scss'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  cartCount: number
  onSelectCategory: (category: string) => void
}

type ActionKind = 'bag' | 'heart' | 'user' | 'cart'

interface ActionIconProps {
  kind: ActionKind
  label: string
  href: string
  count?: number
}

const actionClasses: Record<ActionKind, string> = {
  bag: 'header__orders-icon',
  heart: 'header__favorites-icon',
  user: 'header__account-icon',
  cart: 'header__cart-icon',
}

const actionPaths: Record<Exclude<ActionKind, 'bag'>, ReactNode> = {
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

const ActionIcon: FC<ActionIconProps> = ({ kind, label, href, count }) => (
  <a className="header__action" href={href} aria-label={label}>
    <svg
      className={actionClasses[kind]}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {kind === 'bag' ? (
        <>
          <path
            d="M5 8h14l1 12H4L5 8Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.2"
          />
          <path
            d="M9 9V6a3 3 0 0 1 6 0v3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : (
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {actionPaths[kind]}
        </g>
      )}
    </svg>
    {typeof count === 'number' && count > 0 && (
      <span className="header__cart-count">{count}</span>
    )}
  </a>
)

interface NavigationItem {
  label: string
  href: string
  className: string
  category?: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'TODAS CATEGORIAS',
    href: '#categorias',
    className: 'header__nav-link--categories',
    category: 'Todas',
  },
  {
    label: 'SUPERMERCADO',
    href: '#categorias',
    className: 'header__nav-link--supermarket',
    category: 'Supermercado',
  },
  {
    label: 'LIVROS',
    href: '#categorias',
    className: 'header__nav-link--books',
  },
  {
    label: 'MODA',
    href: '#categorias',
    className: 'header__nav-link--fashion',
    category: 'Moda',
  },
  {
    label: 'LANÇAMENTOS',
    href: '#vitrine-celulares',
    className: 'header__nav-link--releases',
  },
  {
    label: 'OFERTAS DO DIA',
    href: '#banner',
    className: 'header__nav-link--offers',
  },
]

const SearchIcon: FC = () => (
  <svg
    className="header__search-icon"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="m16 16 4.2 4.2" />
  </svg>
)

export const Header: FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onSelectCategory,
}) => (
  <header className="header" id="inicio">
    <div className="header__background header__background--benefits">
      <div className="header__layout">
        <div className="header__benefits">
          <div className="header__benefit header__benefit--security">
            <svg
              className="header__security-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M12 3 19 6v5c0 4.5-2.7 7.7-7 10-4.3-2.3-7-5.5-7-10V6l7-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="header__benefit-label header__benefit-label--security">
              Compra <strong>100% segura</strong>
            </span>
          </div>

          <div className="header__benefit header__benefit--shipping">
            <svg
              className="header__shipping-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
              <circle cx="7" cy="19" r="1.5" />
              <circle cx="18" cy="19" r="1.5" />
            </svg>
            <span className="header__benefit-label header__benefit-label--shipping">
              <strong>Frete grátis</strong> acima de R$ 200
            </span>
          </div>

          <div className="header__benefit header__benefit--installments">
            <svg
              className="header__installments-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 10h18M7 15h4" />
            </svg>
            <span className="header__benefit-label header__benefit-label--installments">
              <strong>Parcele</strong> suas compras
            </span>
          </div>
        </div>
        <span
          className="header__divider--benefits"
          aria-hidden="true"
        />
      </div>
    </div>

    <div className="header__background header__background--main">
      <div className="header__layout">
        <a className="header__brand" href="#inicio" aria-label="Econverse início">
          <img
            className="header__logo"
            src="/Teste%20Front-End%20Jr%20%28Copy%29/Logo.png"
            alt=""
            width="139"
            height="42"
          />
        </a>

        <form
          className="header__search-background"
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

        <div className="header__actions" aria-label="Minha conta e sacola">
          <ActionIcon
            kind="bag"
            label="Meus pedidos"
            href="#vitrine-celulares"
          />
          <ActionIcon kind="heart" label="Favoritos" href="#marcas" />
          <ActionIcon kind="user" label="Minha conta" href="#footer" />
          <ActionIcon
            kind="cart"
            label={`Carrinho com ${cartCount} produtos adicionados`}
            count={cartCount}
            href="#vitrine-celulares"
          />
        </div>
        <span className="header__divider--nav" aria-hidden="true" />
      </div>
    </div>

    <div className="header__background header__background--nav">
      <div className="header__layout">
        <nav className="header__nav-list" aria-label="Menu principal">
          {navigationItems.map((item) => (
            <a
              className={`header__nav-link ${item.className}`}
              href={item.href}
              key={item.label}
              onClick={(event) => {
                if (!item.category) return
                event.preventDefault()
                onSelectCategory(item.category)
                document
                  .getElementById('categorias')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {item.label}
            </a>
          ))}
          <a className="header__subscription" href="#newsletter">
            <svg
              className="header__subscription-icon"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="m3 7 4 3 3-6 3 6 4-3-2 9H5L3 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <span className="header__subscription-label">ASSINATURA</span>
          </a>
        </nav>
      </div>
    </div>
  </header>
)

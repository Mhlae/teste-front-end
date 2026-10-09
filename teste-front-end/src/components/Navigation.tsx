import './Navigation.scss'

interface NavigationProps {
  onSelectCategory: (category: string) => void
}

const links = [
  { label: 'TODAS CATEGORIAS', href: '#categorias', category: 'Todas' },
  { label: 'SUPERMERCADO', href: '#categorias', category: 'Supermercado' },
  { label: 'LIVROS', href: '#categorias' },
  { label: 'MODA', href: '#categorias', category: 'Moda' },
  { label: 'LANÇAMENTOS', href: '#vitrine-celulares' },
  { label: 'OFERTAS DO DIA', href: '#banner' },
  { label: 'ASSINATURA', href: '#newsletter', crown: true },
]

export function Navigation({ onSelectCategory }: NavigationProps) {
  return (
    <nav className="main-navigation" aria-label="Menu principal">
      <div className="main-navigation__inner content-width">
        {links.map((link) => (
          <a
            href={link.href}
            key={link.label}
            onClick={(event) => {
              if (!link.category) return
              event.preventDefault()
              onSelectCategory(link.category)
              document
                .getElementById('categorias')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {link.crown && (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="m3 7 4 3 3-6 3 6 4-3-2 9H5L3 7Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

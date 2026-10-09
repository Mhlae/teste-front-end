import type { ReactNode } from 'react'
import './CategoryNav.scss'

interface CategoryNavProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const categories = [
  'Tecnologia',
  'Supermercado',
  'Bebidas',
  'Ferramentas',
  'Saúde',
  'Esportes e Fitness',
  'Moda',
]

function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, ReactNode> = {
    Tecnologia: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M8 21h8m-4-4v4" />
      </>
    ),
    Supermercado: (
      <>
        <path d="M4 8h16l-1.2 12H5.2L4 8Z" />
        <path d="m9 8 3-5 3 5" />
      </>
    ),
    Bebidas: (
      <>
        <path d="M9 3h6l-1 5 3 3v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9l3-3-1-5Z" />
        <path d="M8 14h8M10 3h4" />
      </>
    ),
    Ferramentas: (
      <>
        <path d="m14 7 3-3 3 3-3 3" />
        <path d="m16 9-7 7" />
        <path d="M7 14 4 17l3 3 3-3" />
        <path d="m13 5 3-3 3 3" />
      </>
    ),
    Saúde: (
      <>
        <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" />
        <path d="M12 8v7m-3.5-3.5h7" />
      </>
    ),
    'Esportes e Fitness': (
      <>
        <path d="M4 7h3v10H4zm13 0h3v10h-3zM7 12h10M2 9v6m20-6v6" />
      </>
    ),
    Moda: (
      <>
        <path d="m8 4 4 2 4-2 5 4-3 3-2-1v10H8V10l-2 1-3-3 5-4Z" />
        <path d="M9 7c.5 2 1.5 3 3 3s2.5-1 3-3" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[category]}
      </g>
    </svg>
  )
}

export function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <nav
      className="category-nav content-width"
      id="categorias"
      aria-label="Categorias da loja"
    >
      {categories.map((category) => (
        <button
          className={`category-nav__item${category === selectedCategory ? ' category-nav__item--active' : ''}`}
          key={category}
          type="button"
          aria-pressed={category === selectedCategory}
          onClick={() => onSelectCategory(category)}
        >
          <span className="category-nav__icon">
            <CategoryIcon category={category} />
          </span>
          <span>{category}</span>
        </button>
      ))}
    </nav>
  )
}

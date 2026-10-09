import { useRef } from 'react'
import type { IProduct } from '../types/product'
import { ProductCard } from './ProductCard'
import './ProductGrid.scss'

interface ProductGridProps {
  id: string
  products: IProduct[]
  selectedTab: string
  onSelectTab: (tab: string) => void
  loading: boolean
  error: string | null
  onRetry: () => void
  onAddToCart: (product: IProduct) => void
  onOpenProduct: (product: IProduct) => void
  title?: string
  showTabs?: boolean
  linkLabel?: string
  linkTarget?: string
  onViewAll?: () => void
}

const productTabs = [
  'CELULAR',
  'ACESSÓRIOS',
  'TABLETS',
  'NOTEBOOKS',
  'TVS',
  'VER TODOS',
]

function ArrowIcon({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'previous' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ProductGrid({
  id,
  products,
  selectedTab,
  onSelectTab,
  loading,
  error,
  onRetry,
  onAddToCart,
  onOpenProduct,
  title = 'Produtos relacionados',
  showTabs = true,
  linkLabel,
  linkTarget,
  onViewAll,
}: ProductGridProps) {
  // O grid foi desenhado para representar várias vitrines da home sem duplicar lógica.
  // Ele recebe o estado da página e decide se mostra abas, carregamento, erro ou o
  // carrossel de produtos em cada bloco.
  const carouselRef = useRef<HTMLDivElement>(null)

  function moveCarousel(direction: -1 | 1) {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollBy({
      left: direction * carousel.clientWidth * 0.85,
      behavior: 'smooth',
    })
  }

  return (
    <section
      className="product-section content-width"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-title">
        <span aria-hidden="true" />
        <div className="section-title__group">
          <h2 id={`${id}-title`}>{title}</h2>
          {linkLabel && (
            <a
              className="section-title__link"
              href={linkTarget ?? `#${id}`}
              onClick={onViewAll}
            >
              {linkLabel}
            </a>
          )}
        </div>
        <span aria-hidden="true" />
      </div>

      {showTabs && (
        <nav className="product-tabs" aria-label="Categorias de produtos">
          {productTabs.map((tab) => (
            <button
              className={tab === selectedTab ? 'product-tabs__selected' : ''}
              key={tab}
              type="button"
              aria-pressed={tab === selectedTab}
              onClick={() => onSelectTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      )}

      {loading && (
        <p className="product-section__message" role="status">
          Carregando produtos…
        </p>
      )}

      {error && (
        <div className="product-section__error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={onRetry}>
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="product-section__message">
          Nenhum produto disponível nesta categoria.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-carousel">
          <button
            className="product-carousel__control product-carousel__control--previous"
            type="button"
            aria-label="Ver produtos anteriores"
            onClick={() => moveCarousel(-1)}
          >
            <ArrowIcon direction="previous" />
          </button>

          <div className="product-carousel__track" ref={carouselRef}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenDetails={onOpenProduct}
              />
            ))}
          </div>

          <button
            className="product-carousel__control product-carousel__control--next"
            type="button"
            aria-label="Ver próximos produtos"
            onClick={() => moveCarousel(1)}
          >
            <ArrowIcon direction="next" />
          </button>
        </div>
      )}
    </section>
  )
}

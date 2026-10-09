import { useEffect, useMemo, useState } from 'react'
import { BrandSection } from './components/BrandSection'
import { CategoryNav } from './components/CategoryNav'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Newsletter } from './components/Newsletter'
import { PartnerBanners } from './components/PartnerBanners'
import { ProductGrid } from './components/ProductGrid'
import { ProductModal } from './components/ProductModal'
import { getProducts } from './services/productService'
import type { IProduct } from './types/product'
import './App.scss'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Tecnologia')
  const [productTab, setProductTab] = useState('CELULAR')
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getProducts(controller.signal)
      .then(setProducts)
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        setError(
          cause instanceof Error
            ? cause.message
            : 'Ocorreu um erro ao carregar os produtos.',
        )
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [retryCount])

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('pt-BR')
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        `${product.name} ${product.description} ${product.category}`
          .toLocaleLowerCase('pt-BR')
          .includes(query)
      const matchesCategory =
        query.length > 0 ||
        selectedCategory === 'Todas' ||
        product.category === selectedCategory ||
        (selectedCategory === 'Supermercado' &&
          product.category === 'Bebidas')

      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  const tabbedProducts = useMemo(() => {
    if (searchQuery.trim() || productTab === 'VER TODOS') return visibleProducts

    const matchesProductTab = (product: IProduct) => {
      const productText =
        `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase(
          'pt-BR',
        )

      switch (productTab) {
        case 'CELULAR':
          return /iphone|celular|smartphone|mobile/.test(productText)
        case 'ACESSÓRIOS':
          return /acess[oó]rio|fone|capa|carregador|airpods/.test(productText)
        case 'TABLETS':
          return /tablet|ipad/.test(productText)
        case 'NOTEBOOKS':
          return /notebook|laptop/.test(productText)
        case 'TVS':
          return /televis[aã]o|\btv\b/.test(productText)
        default:
          return true
      }
    }

    return visibleProducts.filter(matchesProductTab)
  }, [productTab, searchQuery, visibleProducts])

  function retryLoadingProducts() {
    setLoading(true)
    setError(null)
    setRetryCount((current) => current + 1)
  }

  function selectHeaderCategory(category: string) {
    setSelectedCategory(category)
    document
      .getElementById('categorias')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Topo da página com benefícios e navegação principal */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onSelectCategory={selectHeaderCategory}
      />

      <main>
        {/* Hero + categorias funcionam como primeira área de descoberta do cliente */}
        <Hero />
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Primeira vitrine com abas por categoria de produto */}
        <ProductGrid
          id="vitrine-celulares"
          products={tabbedProducts}
          selectedTab={productTab}
          onSelectTab={setProductTab}
          loading={loading}
          error={error}
          onRetry={retryLoadingProducts}
          onAddToCart={(product) => {
            setCartCount((count) => count + 1)
            console.info(`Adicionado ao carrinho: ${product.name}`)
          }}
          onOpenProduct={setSelectedProduct}
          title="Produtos relacionados"
          showTabs
        />

        {/* Banners promocionais do tipo partner, seguindo o fluxo do layout original */}
        <PartnerBanners />

        {/* Segunda sessão de itens, configurada sem abas e com CTA de ver todos */}
        <ProductGrid
          id="vitrine-relacionados"
          products={visibleProducts}
          selectedTab={productTab}
          onSelectTab={setProductTab}
          loading={loading}
          error={error}
          onRetry={retryLoadingProducts}
          onAddToCart={(product) => {
            setCartCount((count) => count + 1)
            console.info(`Adicionado ao carrinho: ${product.name}`)
          }}
          onOpenProduct={setSelectedProduct}
          title="Produtos relacionados"
          linkLabel="Ver todos"
          linkTarget="#vitrine-celulares"
          onViewAll={() => setProductTab('VER TODOS')}
          showTabs={false}
        />

        <PartnerBanners />

        <BrandSection />

        {/* Terceira vitrines de produtos após as marcas, fechando o fluxo da home */}
        <ProductGrid
          id="vitrine-destaques"
          products={visibleProducts}
          selectedTab={productTab}
          onSelectTab={setProductTab}
          loading={loading}
          error={error}
          onRetry={retryLoadingProducts}
          onAddToCart={(product) => {
            setCartCount((count) => count + 1)
            console.info(`Adicionado ao carrinho: ${product.name}`)
          }}
          onOpenProduct={setSelectedProduct}
          title="Produtos relacionados"
          linkLabel="Ver todos"
          linkTarget="#vitrine-celulares"
          onViewAll={() => setProductTab('VER TODOS')}
          showTabs={false}
        />
      </main>

      <Newsletter />
      <Footer />

      {/* Modal fora do fluxo principal para manter a experiência de produto em foco */}
      <ProductModal
        key={selectedProduct?.id ?? 'closed'}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity) => {
          setCartCount((count) => count + quantity)
          console.info(
            `Adicionado ao carrinho: ${product.name} x${quantity}`,
          )
        }}
      />
    </>
  )
}

export default App

import type { IProduct } from '../types/product'
import { formatCurrency } from '../utils/formatCurrency'
import './ProductCard.scss'

interface ProductCardProps {
  product: IProduct
  onAddToCart: (product: IProduct) => void
  onOpenDetails: (product: IProduct) => void
}

export function ProductCard({
  product,
  onAddToCart,
  onOpenDetails,
}: ProductCardProps) {
  // A card de produto funciona como miniatura do catálogo e centraliza informações de
  // preço, parcelamento e CTA. O valor antigo é calculado por fallback para manter a
  // composição visual consistente mesmo quando os dados vierem incompletos.
  const oldPrice = product.oldPrice ?? product.price * 1.07
  const installments = product.installments ?? {
    count: 2,
    value: product.price / 2,
    interestFree: true,
  }
  const shippingLabel = product.freeShipping ? 'Frete grátis' : ''

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <button
        className="product-card__open"
        type="button"
        aria-label={`Abrir produto ${product.name}`}
        onClick={() => onOpenDetails(product)}
      />
      <div className="product-card__details">
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__old-price">{formatCurrency(oldPrice)}</p>
        <p className="product-card__price">{formatCurrency(product.price)}</p>
        <p className="product-card__installments">
          ou {installments.count}x de {formatCurrency(installments.value)}{' '}
          {installments.interestFree ? 'sem juros' : 'com juros'}
        </p>
        {shippingLabel && <p className="product-card__shipping">{shippingLabel}</p>}
        <button
          className="product-card__button"
          type="button"
          onClick={() => onAddToCart(product)}
          aria-label={`Adicionar ${product.name} ao carrinho (demonstração)`}
        >
          COMPRAR
        </button>
      </div>
    </article>
  )
}

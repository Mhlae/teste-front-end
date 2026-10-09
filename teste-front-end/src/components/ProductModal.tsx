import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useEscapeKey } from '../hooks/useEscapeKey'
import type { IProduct } from '../types/product'
import { formatCurrency } from '../utils/formatCurrency'
import './ProductModal.scss'

interface ProductModalProps {
  product: IProduct | null
  onClose: () => void
  onAddToCart: (product: IProduct, quantity: number) => void
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  // O modal do produto concentra a experiência de compra em um único ponto. Ele usa
  // portal para sair do DOM normal, trava o foco para manter a navegação acessível e
  // bloqueia o scroll do body enquanto a sobreposição está aberta.
  const modalRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [quantity, setQuantity] = useState(1)

  useBodyScrollLock(Boolean(product))
  useEscapeKey(() => {
    if (product) onClose()
  }, Boolean(product))

  useEffect(() => {
    if (!product) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    return () => {
      previousFocusRef.current?.focus()
    }
  }, [product])

  useEffect(() => {
    if (!product || !modalRef.current) return

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleFocusTrap)
    return () => document.removeEventListener('keydown', handleFocusTrap)
  }, [product])

  if (!product) {
    return null
  }

  const addQuantity = () => setQuantity((current) => Math.min(current + 1, 99))
  const removeQuantity = () => setQuantity((current) => Math.max(current - 1, 1))

  const handleQuantityKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
    }
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    onClose()
  }

  return createPortal(
    <div className="product-modal__overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="product-modal__close"
          aria-label="Fechar modal de produto"
          onClick={onClose}
        >
          ×
        </button>

        <div className="product-modal__content">
          <div className="product-modal__image-wrap">
            <img src={product.image} alt={product.name} className="product-modal__image" />
          </div>

          <div className="product-modal__details">
            <h2 id="product-modal-title" className="product-modal__title">
              {product.name.toUpperCase()}
            </h2>
            <p className="product-modal__price">{formatCurrency(product.price)}</p>
            <p className="product-modal__description">{product.description}</p>
            <button type="button" className="product-modal__link">
              Veja mais detalhes do produto &gt;
            </button>

            <div className="product-modal__actions">
              <div className="product-modal__quantity" aria-label="Quantidade do produto">
                <button
                  type="button"
                  onClick={removeQuantity}
                  aria-label="Diminuir quantidade"
                  onKeyDown={handleQuantityKeyDown}
                >
                  −
                </button>
                <span>{String(quantity).padStart(2, '0')}</span>
                <button
                  type="button"
                  onClick={addQuantity}
                  aria-label="Aumentar quantidade"
                  onKeyDown={handleQuantityKeyDown}
                >
                  +
                </button>
              </div>

              <button type="button" className="product-modal__cta" onClick={handleAddToCart}>
                COMPRAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

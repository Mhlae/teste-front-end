import { mockProducts } from '../data/products'
import type { IProduct } from '../types/product'

export async function getProducts(signal?: AbortSignal): Promise<IProduct[]> {
  await new Promise((resolve) => {
    const timeout = setTimeout(resolve, 250)
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout)
      resolve(undefined)
    }, { once: true })
  })

  if (signal?.aborted) {
    throw new DOMException('Operation aborted', 'AbortError')
  }

  return mockProducts
}

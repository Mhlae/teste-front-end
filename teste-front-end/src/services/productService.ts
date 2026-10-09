import { mockProducts } from '../data/products'
import type { IProduct } from '../types/product'

const PRODUCTS_URL =
  'https://raw.githubusercontent.com/EconverseAG/teste-front-end/main/products.json'

interface EconverseProduct {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

function isProduct(value: unknown): value is IProduct {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    'image' in value &&
    typeof value.image === 'string' &&
    'description' in value &&
    typeof value.description === 'string' &&
    'category' in value &&
    typeof value.category === 'string'
  )
}

function isEconverseProduct(value: unknown): value is EconverseProduct {
  return (
    typeof value === 'object' &&
    value !== null &&
    'productName' in value &&
    typeof value.productName === 'string' &&
    'descriptionShort' in value &&
    typeof value.descriptionShort === 'string' &&
    'photo' in value &&
    typeof value.photo === 'string' &&
    'price' in value &&
    typeof value.price === 'number'
  )
}

function getCategory(name: string): string {
  const normalizedName = name.toLocaleLowerCase('pt-BR')

  if (/iphone|celular|smartphone/.test(normalizedName)) return 'Tecnologia'
  if (/tablet|ipad/.test(normalizedName)) return 'Tecnologia'
  if (/notebook|laptop/.test(normalizedName)) return 'Tecnologia'
  if (/televis[aã]o|\btv\b/.test(normalizedName)) return 'Tecnologia'
  if (/ferramenta|martelo|chave/.test(normalizedName)) return 'Ferramentas'
  if (/sa[uú]de|vita|suplemento|health/.test(normalizedName)) return 'Saúde'
  if (/esporte|fitness|esteira/.test(normalizedName)) return 'Esportes e Fitness'
  if (/moda|vestido|sapato/.test(normalizedName)) return 'Moda'
  if (/mercado|alimento|bebida|água|cesta/.test(normalizedName)) return 'Supermercado'

  return 'Tecnologia'
}

async function fetchProductList(
  url: string,
  signal?: AbortSignal,
): Promise<unknown> {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`A fonte de produtos respondeu com erro ${response.status}.`)
  }

  return response.json() as Promise<unknown>
}

async function fetchEconverseProducts(
  signal?: AbortSignal,
): Promise<IProduct[]> {
  const data = await fetchProductList('/api/products', signal)

  if (
    typeof data !== 'object' ||
    data === null ||
    !('success' in data) ||
    data.success !== true ||
    !('products' in data) ||
    !Array.isArray(data.products) ||
    !data.products.every(isEconverseProduct)
  ) {
    throw new Error('A API Econverse retornou uma lista de produtos inválida.')
  }

  return data.products.map((product, index) => ({
    id: index + 1,
    name: product.productName,
    price: product.price,
    image: product.photo,
    description: product.descriptionShort,
    category: getCategory(product.productName),
  }))
}

export async function getProducts(signal?: AbortSignal): Promise<IProduct[]> {
  let econverseError: unknown

  try {
    return await fetchEconverseProducts(signal)
  } catch (error) {
    if (signal?.aborted) throw error
    econverseError = error
  }

  try {
    const data = await fetchProductList(PRODUCTS_URL, signal)
    if (!Array.isArray(data) || !data.every(isProduct)) {
      throw new Error(
        'O JSON do GitHub não contém uma lista válida no formato IProduct.',
      )
    }

    return data
  } catch (fallbackError) {
    if (signal?.aborted) throw fallbackError

    console.warn('Falling back to local mock products.', {
      econverseError,
      fallbackError,
    })

    return mockProducts
  }
}

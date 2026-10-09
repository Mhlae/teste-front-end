import './BrandSection.scss'

const brands = ['Apple', 'Samsung', 'Motorola', 'Xiaomi', 'Dell']

export function BrandSection() {
  return (
    <section
      className="brand-section content-width"
      id="marcas"
      aria-labelledby="brand-title"
    >
      <h2 id="brand-title">Navegue por marcas</h2>
      <div className="brand-section__list">
        {brands.map((brand) => (
          <a
            className="brand-section__item"
            href="#vitrine-celulares"
            aria-label={`Ver produtos da marca ${brand}`}
            key={brand}
          >
            <span className="brand-section__name">{brand}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

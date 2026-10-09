import './BrandSection.scss'

const brands = [1, 2, 3, 4, 5]

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
            aria-label="Ver produtos da marca Econverse"
            key={brand}
          >
            <img
              className="brand-section__logo"
              src={`/Teste%20Front-End%20Jr%20%28Copy%29/Logo-${brand}.png`}
              alt="Econverse"
              width="117"
              height="35"
            />
          </a>
        ))}
      </div>
    </section>
  )
}

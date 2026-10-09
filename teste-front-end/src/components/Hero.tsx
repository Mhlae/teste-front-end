import './Hero.scss'

export function Hero() {
  return (
    <section className="hero" id="banner" aria-labelledby="hero-title">
      <div className="hero__image" aria-hidden="true" />
      <div className="hero__content content-width">
        <h1 id="hero-title">Venha conhecer nossas promoções</h1>
        <p>
          <strong>50% Off</strong> nos produtos
        </p>
        <a className="hero__button" href="#vitrine-celulares">
          Ver produto
        </a>
      </div>
    </section>
  )
}

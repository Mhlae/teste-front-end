import partnerStore from '../assets/partner-store.jpg'
import partnerTechnology from '../assets/partner-tech.jpg'
import './PartnerBanners.scss'

const banners = [
  { image: partnerStore, label: 'Conheça nossos parceiros de tecnologia' },
  {
    image: partnerTechnology,
    label: 'Descubra as novidades dos nossos parceiros',
  },
]

export function PartnerBanners() {
  return (
    <section
      className="partner-banners content-width"
      aria-label="Banners de parceiros"
    >
      {banners.map((banner) => (
        <article
          className="partner-banner"
          key={banner.label}
          style={{ backgroundImage: `url("${banner.image}")` }}
        >
          <div className="partner-banner__content">
            <h2>Parceiros</h2>
            <p>Lorem ipsum dolor sit amet, consectetur</p>
            <a href="#marcas">CONFIRA</a>
          </div>
        </article>
      ))}
    </section>
  )
}

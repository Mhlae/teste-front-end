import { EconverseLogo } from './EconverseLogo'
import './Footer.scss'

const linkGroups = [
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre Nós', href: '#inicio' },
      { label: 'Movimento', href: '#marcas' },
      { label: 'Trabalhe conosco', href: 'mailto:contato@econverse.com.br' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Suporte', href: 'mailto:suporte@econverse.com.br' },
      { label: 'Fale Conosco', href: 'mailto:contato@econverse.com.br' },
      { label: 'Perguntas Frequentes', href: '#newsletter' },
    ],
  },
  {
    title: 'Termos',
    links: [
      { label: 'Termos e Condições', href: '#newsletter' },
      { label: 'Política de Privacidade', href: '#newsletter' },
      { label: 'Troca e Devolução', href: '#vitrine-celulares' },
    ],
  },
]

function SocialIcon({ name }: { name: 'instagram' | 'facebook' | 'linkedin' }) {
  if (name === 'instagram') {
    return (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
      </>
    )
  }

  if (name === 'facebook') {
    return (
      <path
        d="M14.2 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8v3.1h2.8v8h3.4Z"
        fill="currentColor"
        stroke="none"
      />
    )
  }

  return (
    <>
      <path d="M5 8v11M5 5v.1M10 19v-6c0-2 1.2-3 3-3s3 1 3 3v6M10 10v9" />
    </>
  )
}

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__inner content-width">
        <div className="site-footer__about">
          <a href="#inicio" aria-label="Econverse início">
            <EconverseLogo />
          </a>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="site-footer__socials" aria-label="Redes sociais">
            {(['instagram', 'facebook', 'linkedin'] as const).map((network) => (
              <a
                href={`https://www.${network}.com/`}
                key={network}
                aria-label={`Econverse no ${network}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <g
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <SocialIcon name={network} />
                  </g>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {linkGroups.map((group) => (
          <nav
            className="site-footer__links"
            aria-label={group.title}
            key={group.title}
          >
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="site-footer__bottom">
        <span>© {currentYear} Econverse. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}

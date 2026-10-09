import './BenefitsBar.scss'

const benefits = [
  {
    title: 'Compra 100% segura',
    detail: 'seus dados protegidos',
    icon: (
      <>
        <path d="M12 3 19 6v5c0 4.5-2.7 7.7-7 10-4.3-2.3-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Frete grátis',
    detail: 'acima de R$ 200',
    icon: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </>
    ),
  },
  {
    title: 'Parcele suas compras',
    detail: 'em até 12x sem juros',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
  },
]

export function BenefitsBar() {
  return (
    <div className="benefits-bar">
      <div className="benefits-bar__inner content-width">
        {benefits.map((benefit) => (
          <div className="benefits-bar__item" key={benefit.title}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <g
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {benefit.icon}
              </g>
            </svg>
            <span>
              <strong>{benefit.title}</strong>
              <small>{benefit.detail}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

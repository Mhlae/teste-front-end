import './EconverseLogo.scss'

interface EconverseLogoProps {
  className?: string
}

export function EconverseLogo({ className = '' }: EconverseLogoProps) {
  return (
    <span className={`econverse-logo ${className}`.trim()} aria-label="Econverse">
      <span className="econverse-logo__mark" aria-hidden="true">
        ec
      </span>
      <span className="econverse-logo__word">onverse</span>
    </span>
  )
}

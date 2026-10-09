import { useState, type ChangeEvent, type FormEvent } from 'react'
import './Newsletter.scss'

type NewsletterFormValues = {
  name: string
  email: string
  terms: boolean
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const [formValues, setFormValues] = useState<NewsletterFormValues>({
    name: '',
    email: '',
    terms: false,
  })
  const [errors, setErrors] = useState<
    Partial<Record<keyof NewsletterFormValues, string>>
  >({})
  const [successMessage, setSuccessMessage] = useState('')

  function updateField(
    event: ChangeEvent<HTMLInputElement>,
    field: keyof NewsletterFormValues,
  ) {
    const value = field === 'terms' ? event.target.checked : event.target.value

    setFormValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setSuccessMessage('')
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof NewsletterFormValues, string>> = {}

    if (formValues.name.trim().length < 2) {
      nextErrors.name = 'Informe um nome válido.'
    }

    if (!emailPattern.test(formValues.email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.'
    }

    if (!formValues.terms) {
      nextErrors.terms = 'Você precisa aceitar os termos.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm()) {
      setSuccessMessage('')
      return
    }

    setSuccessMessage('Inscrição realizada com sucesso!')
    setFormValues({ name: '', email: '', terms: false })
    setErrors({})
  }

  return (
    <section
      className="newsletter"
      id="newsletter"
      aria-labelledby="newsletter-title"
    >
      <div className="newsletter__inner content-width">
        <div className="newsletter__copy">
          <h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2>
          <p>
            Assine a nossa newsletter e receba as novidades e conteúdos
            exclusivos da Econverse.
          </p>
        </div>
        <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
          <div className="newsletter__fields">
            <label className="visually-hidden" htmlFor="newsletter-name">
              Nome
            </label>
            <input
              id="newsletter-name"
              name="name"
              type="text"
              placeholder="Digite seu nome"
              autoComplete="name"
              value={formValues.name}
              onChange={(event) => updateField(event, 'name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'newsletter-name-error' : undefined}
            />
            {errors.name && (
              <span id="newsletter-name-error" className="newsletter__error">
                {errors.name}
              </span>
            )}
            <label className="visually-hidden" htmlFor="newsletter-email">
              E-mail
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              autoComplete="email"
              value={formValues.email}
              onChange={(event) => updateField(event, 'email')}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
            />
            {errors.email && (
              <span id="newsletter-email-error" className="newsletter__error">
                {errors.email}
              </span>
            )}
            <button type="submit">INSCREVER</button>
          </div>
          <label className="newsletter__terms">
            <input
              name="terms"
              type="checkbox"
              checked={formValues.terms}
              onChange={(event) => updateField(event, 'terms')}
              aria-invalid={Boolean(errors.terms)}
              aria-describedby={errors.terms ? 'newsletter-terms-error' : undefined}
            />
            <span>Aceito os termos e condições</span>
          </label>
          {errors.terms && (
            <span
              id="newsletter-terms-error"
              className="newsletter__error newsletter__error--inline"
            >
              {errors.terms}
            </span>
          )}
          {successMessage && (
            <p className="newsletter__notice" role="status">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

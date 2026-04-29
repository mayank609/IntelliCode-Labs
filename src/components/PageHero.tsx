import { useNavigate } from 'react-router-dom'

interface PageHeroProps {
  label: string
  title: string
  subtitle?: string
  cta?: { text: string; href: string }
  dark?: boolean
}

export default function PageHero({ label, title, subtitle, cta, dark }: PageHeroProps) {
  const navigate = useNavigate()
  return (
    <div className={`page-hero${dark ? ' page-hero-dark' : ''}`}>
      <div className="page-hero-inner">
        <span className="page-hero-label">{label}</span>
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
        {cta && (
          <button
            className="btn-hero-primary"
            style={{ marginTop: 32 }}
            onClick={() => navigate(cta.href)}
          >
            {cta.text}
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

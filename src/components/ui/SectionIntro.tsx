import { ReactNode } from 'react'

interface SectionIntroProps {
  label: string
  title: ReactNode
  subtitle: string
  align?: 'left' | 'between'
  actions?: ReactNode
}

export default function SectionIntro({ label, title, subtitle, align = 'between', actions }: SectionIntroProps) {
  return (
    <div className={`section-intro ${align === 'left' ? 'left' : 'between'}`}>
      <div className="section-intro-main">
        <span className="section-label">{label}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-intro-side">
        <p className="section-sub">{subtitle}</p>
        {actions ? <div className="section-intro-actions">{actions}</div> : null}
      </div>
    </div>
  )
}

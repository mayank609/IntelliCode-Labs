import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        label="404 Error"
        title="System Link Severed."
        subtitle="The page you're looking for has moved or doesn't exist. Let's get you back on track."
      />
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 48 }}>
            <svg width={80} height={80} viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" style={{ opacity: 0.5 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="section-title">Page Not Found</h2>
          <p className="section-sub" style={{ margin: '24px auto 40px' }}>
            The AI might have hallucinated this route, or it simply hasn't been built yet.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <button onClick={() => navigate('/')} className="btn-hero-primary">Back To Home</button>
            <button onClick={() => navigate('/contact')} className="btn-hero-secondary">Contact Support</button>
          </div>
        </div>
      </div>
    </>
  )
}

import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms Of Use"
        subtitle="Last Updated: May 3, 2026. Please read these terms carefully before using our services."
      />
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <div style={{ maxWidth: 800, margin: '0 auto', fontSize: '1rem', lineHeight: 1.8, color: '#444' }}>
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>1. Acceptance of Terms</h3>
            <p>By accessing or using the IntelliCodeLabs website and services, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on IntelliCodeLabs' website for personal, non-commercial transitory viewing only.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>3. Disclaimer</h3>
            <p>The materials on IntelliCodeLabs' website are provided on an 'as is' basis. IntelliCodeLabs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>4. Limitations</h3>
            <p>In no event shall IntelliCodeLabs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on IntelliCodeLabs' website.</p>
            
            <h3 style={{ color: 'var(--black)', marginTop: 40, marginBottom: 16 }}>5. Governing Law</h3>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the State of Delaware and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
          </div>
        </div>
      </div>
    </>
  )
}

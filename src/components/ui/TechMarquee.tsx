const TechMarquee = () => {
  const techList = [
    'OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'React', 'Next.js', 
    'Node.js', 'Python', 'AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker',
    'PostgreSQL', 'Redis', 'Weaviate', 'Hugging Face'
  ]

  // Duplicate for seamless scroll
  const marqueeItems = [...techList, ...techList, ...techList]

  return (
    <div className="marquee-container" style={{
      width: '100%',
      overflow: 'hidden',
      background: 'white',
      padding: '24px 0',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="marquee-track" style={{ display: 'flex', gap: '48px' }}>
        {marqueeItems.map((tech, i) => (
          <div key={i} className="marquee-item" style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#888896',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', opacity: 0.5 }}></span>
            {tech}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechMarquee

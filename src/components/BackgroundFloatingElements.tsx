import React from 'react'
import FloatingOrbs from './FloatingOrbs'

interface BackgroundFloatingElementsProps {
  density?: 'low' | 'medium' | 'high'
  colors?: Array<'blue' | 'purple' | 'teal' | 'cyan'>
  className?: string
}

export const BackgroundFloatingElements: React.FC<BackgroundFloatingElementsProps> = ({
  density = 'medium',
  colors = ['blue', 'purple', 'teal', 'cyan'],
  className = '',
}) => {
  return (
    <div className={`floating-orbs-bg ${className}`}>
      <FloatingOrbs density={density} colors={colors} />
    </div>
  )
}

export default BackgroundFloatingElements

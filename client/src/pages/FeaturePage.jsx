import React from 'react'
import { FeaturesSectionWithBentoGrid } from '../components/feature-section-with-bento-grid'

const FeaturePage = () => {
  return (
    <div
      className="flex justify-center min-h-screen"
      style={{
        background: `
          radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%),
          linear-gradient(135deg, #0a0613 0%, #150d27 100%)
        `,
      }}
    >
      <div className="max-w-[1250px] w-full">
        <FeaturesSectionWithBentoGrid />
      </div>
    </div>
  )
}

export default FeaturePage

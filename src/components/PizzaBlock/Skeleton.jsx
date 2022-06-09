import React from 'react'
import ContentLoader from "react-content-loader"

export const Skeleton = () => {
  return (
    <ContentLoader
    className='pizza-block'
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="272" rx="18" ry="18" width="280" height="39" />
      <rect x="120" y="186" rx="0" ry="0" width="34" height="1" />
      <rect x="0" y="331" rx="21" ry="21" width="280" height="84" />
      <rect x="1" y="424" rx="5" ry="5" width="69" height="29" />
      <rect x="161" y="427" rx="12" ry="12" width="114" height="29" />
      <circle cx="135" cy="135" r="135" />
    </ContentLoader>
  )
}

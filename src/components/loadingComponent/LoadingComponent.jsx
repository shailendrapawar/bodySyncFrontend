import React from 'react'
import './loadingComponent.css'

const LoadingComponent = ({value}) => {
  return (
    <div className="loading-balls-container" style={value?{display:"flex"}:{display:"none"}}>
      <div className="loading-ball"></div>
      <div className="loading-ball"></div>
      <div className="loading-ball"></div>
      <div className="loading-ball"></div>
      <div className="loading-ball"></div>
    </div>
  )
}

export default LoadingComponent
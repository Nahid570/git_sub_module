import React from 'react'
import backgroundImg from '../assets/images/background.png'
import logoFront from '../assets/images/logoFront.png'

const LeftImageArea = () => {
  return (
    <div
      className="bg order-2 order-md-1"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="text-center" style={{marginTop: "30%"}}>
        <img src={logoFront} />
        <div className="d-flex justify-content-center">
            <p style={{ height: '92px', width: '456px', color: '#000000' }}>
          My Health Rx is a web based smart health solution. It keeps all types
          of health information for doctors and patients. During a consultation
          it provides a consultant record of health information and printed
          prescription. </p>
        </div>
      </div>
    </div>
  )
}

export default LeftImageArea

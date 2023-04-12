import React from 'react'

import dani from '../assets/FullStack/Dani.jpg'
import ruben from '../assets/FullStack/Ruben.jpg'

import "../styles/aboutUs.css"

const AboutUs = () => {
  return (
    <>
     <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      <div className='containerCards'>
        <div className='fichaDani'>
          <img className='imgDani' src={dani} alt='Dani Valero'></img>
          <span>Dani Valero</span>
          <a href='https://www.linkedin.com/in/danivalero2704/' target="_blank">
            <button>
              <i className="fa-brands fa-linkedin fa-2x"></i>
            </button>
          </a>
        </div>

        <div className='fichaRuben'>
          <img className='imgRuben' src={ruben} alt='Rubén R. Ganga'></img>
          <span>Rubén R. Ganga</span>
          <a href='https://www.linkedin.com/in/ruben-r-ganga/' target="_blank">
            <button>
              <i className="fa-brands fa-linkedin fa-2x"></i>
            </button>
          </a>
        </div>

      </div>
    </>
  );
};

export default AboutUs;
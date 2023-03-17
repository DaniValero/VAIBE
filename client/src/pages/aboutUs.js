import React from 'react'
import dani from '../assets/FullStack/Dani.jpg'
import ruben from '../assets/FullStack/Ruben.jpg'
import "../styles/aboutUs.css"

const AboutUs = () => {
  return (
    <>
      <div className='containerCards'>

        <div className="card">
          <div className="img">
            <img src={dani} alt='Dani Valero'></img>
          </div>
          <span> Dani Valero</span>
          <a href='https://www.linkedin.com/in/danivalero2704/' target="_blank">
            <button>
              <i className="fa-brands fa-linkedin fa-2x"></i>
            </button>
          </a>
        </div>


        <div className="card">
          <div className="img">
            <img src={ruben} alt='Rubén Ruiz'></img>
          </div>
          <span> Rubén R. Ganga</span>
          <a href='https://www.linkedin.com/in/rub%C3%A9n-r-ganga-5559a0259/' target="_blank"> </a>
          <button>
              <i className="fa-brands fa-linkedin fa-2x"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
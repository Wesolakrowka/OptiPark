import React from 'react';
import './Home.css';
import image1 from '../assets/image1.svg';
import image2 from '../assets/image2.svg';
import image3 from '../assets/image3.svg';

const Home = () => {
  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div id='home' className="hero-wrapper">
        <div className="hero-left">
          <h1>Welcome to OptiPark</h1>
          <h1>Your Path to the <strong>Perfect <br /> Business Environment</strong></h1>
          <span>Find the Perfect Location for Your Business Using Data-Driven Insights.</span>
          <button className="arrow-button" onClick={scrollToServices}>
            Learn More<span className="arrow"></span>
          </button>
        </div>
        <div className="hero-right">
          <img src={image1} alt="hero" className="hero-image" />
        </div>
      </div>

      <div id='about' className="about-wrapper">
        <div className="about-left">
          <div className="title">About Us
            <div className="underline"></div>
          </div>
          <img src={image2} alt="about" />
        </div>
        <div className="about-right">
          <span>
            At <strong className="gradient">Optipark</strong>, we specialize in helping businesses find the ideal location to thrive. By understanding the unique needs of each client, we offer tailored recommendations for business parks that align with their specific criteria. Our goal is to simplify the decision-making process, allowing companies to focus on growth while we provide insights into the best environments to host their operations. Let us help you find the perfect place for your business to succeed.
          </span>
        </div>
      </div>

      <div id="services" className="service-wrapper">
        <div className="service-left">
          <div className="title">Services
            <div className="underline"></div>
          </div>
          <div className="service-card">
            <h3>Data driven insights</h3>
            <span>
              We use advanced analytical concepts to provide you with the best recommendations for business locations. Through a tailored approach, we consider each client’s specific criteria and preferences to suggest the most suitable business parks for their company. Leveraging sophisticated methods, we help you make informed decisions based on precise data, allowing your business to thrive in the ideal environment.
            </span>
          </div>
        </div>
        <div className="service-right">
          <img src={image3} alt="services" />
        </div>
      </div>

      <div id= 'contact' className="contact-wrapper">
        <div className="contact-container">
          <div className="title">Contact Us
            <div className="underline"></div>
          </div>
          <form method="POST" id="form">
            <div id="result" style={{ display: 'none' }}></div>
            <input type="hidden" name="access_key" value="40ce41e9-612b-4106-88c3-2efa162cfe0e" />
            <div className="form-divide">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            <textarea name="message" required placeholder="Your Message"></textarea>
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            <button type="submit" className="arrow-button">Submit Form</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;

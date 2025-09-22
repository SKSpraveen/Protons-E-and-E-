import React, { useEffect } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import aboutusImage from '../Images/aboutus.png';
import ourmissionImage from '../Images/ourmission.png';
import whychooseusImage from '../Images/whychooseus.png';
import ourvaluesImage from '../Images/ourvalues.png';
import getintouchImage from '../Images/getintouch.png';
import './Aboutus.css';

const Aboutuspage = ({ rows, selectedUser, deleteUser }) => {
  useEffect(() => {
    const scrollHandler = () => {
      const elements = document.querySelectorAll('.scroll-animation');
      elements.forEach(element => {
        if (isElementInViewport(element)) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return (
    <div className="aboutus-container">
      <Header /> 
      <br />
      
      <div className="aboutus-section">
        <img src={aboutusImage} className="aboutus-image" alt="About Us" />
        <div className="aboutus-content">
          <h2 className="aboutus-heading">At Protons, we are committed to safeguarding your peace of mind by providing top-notch security camera installation services. With years of experience in the industry, we understand the importance of protecting your property, loved ones, and assets.</h2>
        </div>
      </div>

      <div className="section">
        <img src={ourmissionImage} className="section-image scroll-animation" alt="Our Mission" />
        <div className="section-content">
          <p className="section-text scroll-animation"><i>Our mission is to empower individuals and businesses with cutting-edge security solutions tailored to their unique needs. We strive to:</i></p>
        </div>
      </div>

      <div className="section-reverse">
        <div className="section-content">
          <p className="section-text scroll-animation"><i>Expertise: Our team comprises highly skilled technicians with extensive experience in security camera installation.<br />
          Customization: We believe that one size does not fit all. We tailor our solutions to meet your specific security needs and budget.<br />
          Quality: We only use high-quality security cameras and equipment from trusted manufacturers, ensuring reliability and longevity.<br />
          Customer Satisfaction: Your satisfaction is our priority. We are committed to delivering exceptional service and support every step of the way.<br />
          Peace of Mind: With our security camera systems in place, you can rest assured that your property is protected around the clock.</i></p>
        </div>
        <img src={whychooseusImage} className="section-image scroll-animation" alt="Why Choose Us" />
      </div>

      <div className="section">
        <img src={ourvaluesImage} className="section-image scroll-animation" alt="Our Values" />
        <div className="section-content">
          <p className="section-text scroll-animation"><i>Integrity: We uphold the highest ethical standards in all aspects of our business.<br />
          Professionalism: Our team is dedicated to providing professional service with attention to detail.<br />
          Reliability: You can count on us to deliver on our promises and exceed your expectations.<br />
          Customer-Centric Approach: Your needs are at the heart of everything we do. We listen, understand, and prioritize your security concerns.</i></p>
        </div>
      </div>

      <div className="section-reverse">
        <div className="section-content">
          <p className="section-text scroll-animation"><i>Ready to enhance your security? Contact us today to schedule a consultation and take the first step towards a safer environment for your home or business.</i></p>
        </div>
        <img src={getintouchImage} className="section-image scroll-animation" alt="Get in Touch" />
      </div>
<br /><br /><br />

      <Footer />
    </div>
  );
}

export default Aboutuspage;

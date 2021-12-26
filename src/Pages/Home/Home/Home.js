import React from 'react';
import Blog from '../Blog/Blog';
import Footer from '../Footer/Footer';
import HeroSection from '../HeroSection/HeroSection';
import Navigation from '../Navigation/Navigation';
import OurAgents from '../OurAgents/OurAgents';
import Properties from '../Properties/Properties';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
   return (
      <>
         <Navigation/>
         <HeroSection/>
         <Services/>
         <Properties/>
         <Testimonial/>
         <OurAgents/>
         <Blog/>
         <Footer/>
      </>
   );
};

export default Home;
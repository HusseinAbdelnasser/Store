import React from 'react';
import Header1 from '../components/header/Header1';
import Header2 from '../components/header/Header2';
import Hero from '../components/hero/Hero';
import Footer from '../components/footer/footer';
import Main from '../components/main/Main';
const Home = () => {
  return (
    <div>
        <Header1 />
        <Header2 />
        <Hero />
        <Main />
        <Footer />
    </div>
  )
}

export default Home
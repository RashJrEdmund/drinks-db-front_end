/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
import '../styles/Main.css';
import React from 'react';
import { MainContext } from '../context/MyContext';
import FetchData from '../data/FetchData';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Body from '../components/Body';
import Footer from '../components/Footer';

function Main() {
  const [drinks, setDrinks] = React.useState({});
  const [userStatus, setUserStatus] = React.useState('Guest');

  React.useEffect(() => {
    FetchData()
      .then((res) => setDrinks(res))
      .catch((err) => console.log('Erro!', err));
  }, []);

  return (
    <div className="Main">
      <MainContext.Provider value={{ drinks, userStatus, setUserStatus }}>
        <Navbar />
        <Hero />
        <Body />
        <Footer />
      </MainContext.Provider>
    </div>
  );
}

export default Main;

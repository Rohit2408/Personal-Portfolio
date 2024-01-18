import { useState, useEffect } from 'react';
import './App.css';
import BarLoader from "react-spinners/BarLoader";
import Home from './routes/Home';
import About from './routes/About';
import Project from './routes/Project';
import Contact from './routes/Contact';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import ParticleAnimation from './components/ParticleCanvas/ParticleCanvas';
import CustomCursor from './components/CustomCursor/CustomCursor';

function App() {
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect (() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const isMobile = innerWidth < 768;

  return (
    <div className='App'>
      {loading ? (
        <div className='loader-container'>
          <BarLoader
            color='#02d688'
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
            className='loader'
          />
        </div>
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='project' element={<Project />} />
            <Route path='contact' element={<Contact />} />
          </Routes>
        </div>
      )}
      {!loading && <ParticleAnimation />}
      {!isMobile && <CustomCursor />}
    </div>
  );
}

export default App;

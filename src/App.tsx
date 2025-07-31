import React, { useState, useEffect, useRef } from 'react';
import { Star, Calendar, MapPin, Users, Clock, Theater, Instagram } from 'lucide-react';

// Import images
import flyerImage from './assets/flyer3.jpg';
import logoImage from './assets/logo.png';
import camilaImage from './assets/camila.png';
import fherImage from './assets/fher.png';
import anaelImage from './assets/anael.png';
import emiImage from './assets/emi.png';
import magaliImage from './assets/magali.png';
import rubiaImage from './assets/rubia.png';
import mauroImage from './assets/mauro.png';
import lucaImage from './assets/luca.png';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        // Make hero elements always visible
        if (element.classList.contains('hero-text') || 
            element.classList.contains('hero-image') || 
            element.classList.contains('logo-container')) {
          element.classList.add('active');
          return;
        }

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      });
    };

    // Initial check after a short delay
    setTimeout(() => {
      handleScroll();
    }, 500);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const characters = [
    { name: 'Camila', image: camilaImage },
    { name: 'CHORI', image: fherImage },
    { name: 'Anael', image: anaelImage },
    { name: 'Severino', image: emiImage },
    { name: 'Leticia', image: magaliImage },
    { name: 'Luana', image: rubiaImage },
    { name: 'Mauro', image: mauroImage },
    { name: 'Luca', image: lucaImage }
  ];

  // Touch/Mouse handlers for carousel
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const walk = (startX - clientX) * 2;
    carouselRef.current.scrollLeft = scrollLeft + walk;
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      // Calculate card width based on screen size
      const isMobile = window.innerWidth <= 767;
      const cardWidth = isMobile ? 320 : 350; // card width + gap
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setCurrentSlide(Math.max(0, Math.min(newIndex, characters.length - 1)));
    }
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      // Calculate card width based on screen size
      const isMobile = window.innerWidth <= 767;
      const cardWidth = isMobile ? 320 : 350; // card width + gap
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentSlide(index);
    }
  };

  const whatsappMessage = encodeURIComponent('¡Hola! Quiero reservar entradas para la obra "Quién podría". ¿Me pasás info sobre las próximas funciones y cómo hago la reserva? ¡Gracias!');
  const whatsappUrl = `https://wa.me/5491165622872?text=${whatsappMessage}`;

  return (
    <div className="app">
      {/* Hero Section */}
              <section className="hero">
          <div className="hero-content">
            <div className={`hero-text reveal-left ${isLoaded ? 'animate-in' : ''}`}>
              <div className="logo-container reveal-scale">
                <img 
                  src={logoImage} 
                  alt="Quién Podría - Logo" 
                  className="logo"
                  loading="eager"
                  decoding="async"
                />
              </div>
            <p>
              Una noche cualquiera, siete amigxs y un jueguito de cartas que arranca inocente… hasta que "Quién podría" empieza a destapar secretos, levantar máscaras y poner a todos en jaque. Traiciones disfrazadas de chistes, ex que reaparecen, anécdotas insólitas y un empleado tirando frases en guaraní que te descoloca. Una comedia argenta y frenética donde nadie está listo para la verdad.
            </p>
            <div className="hero-final-text">
              <p>Te vas a reír, te vas a incomodar… y seguro salís preguntándote:</p>
              <p>¿Y yo, de cuál de este grupo seré?</p>
            </div>
          </div>
          
                      <div className={`hero-image reveal-right ${isLoaded ? 'animate-in' : ''}`}>
              <img 
                src={flyerImage} 
                alt="Flyer de la obra teatral" 
                loading="eager"
                decoding="async"
              />
            </div>
        </div>
      </section>

      {/* Characters Title Section */}
      <section className="characters-title-section">
        <div className="container">
          <h2 className={`section-title reveal ${isLoaded ? 'animate-in' : ''}`}>
            Conocé a Nuestros Personajes
          </h2>
        </div>
      </section>

      {/* Characters Carousel Section */}
      <section className="characters">
        <div className="container">
          <div className="carousel-container">
            <div 
              className="carousel-track"
              ref={carouselRef}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            >
              {characters.map((character, index) => (
                <div 
                  key={character.name}
                  className={`character-item reveal-scale ${isLoaded ? 'animate-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="character-image">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                  <h3>{character.name}</h3>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="carousel-indicators reveal-up">
              {characters.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Ver personaje ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Show Info Section */}
              <section className="show-info-section">
          <div className="container">
            <div className={`show-details reveal ${isLoaded ? 'animate-in' : ''}`}>
              <div className="detail-item reveal-left">
                <Clock className="detail-icon" />
                <div>
                  <strong>Duración</strong>
                  <p>65 minutos</p>
                </div>
              </div>
              <div className="detail-item reveal">
                <Theater className="detail-icon" />
                <div>
                  <strong>Género</strong>
                  <p>Comedia moderna, coral, SIT COM</p>
                </div>
              </div>
              <div className="detail-item reveal-right">
                <Users className="detail-icon" />
                <div>
                  <strong>Compañía</strong>
                  <p>La Colmena Teatro</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* CTA Section */}
              <section className="cta">
          <div className="container">
            <div className={`cta-content reveal ${isLoaded ? 'animate-in' : ''}`}>
              <h2 className="cta-title reveal-scale">¿Te Animás a Jugar?</h2>
              <p className="reveal-up">Funciones limitadas. No te quedes afuera.</p>
              
              <div className="show-info reveal-up">
                <div className="info-item reveal-left">
                  <Calendar className="info-icon" />
                  <div>
                    <strong>Próxima Fecha</strong>
                    <p>Sábado 9 de Agosto</p>
                  </div>
                </div>
                <div className="info-item reveal-right">
                  <MapPin className="info-icon" />
                  <div>
                    <strong>Sala Aparecidas</strong>
                    <p>Plaza de Pacheco</p>
                    <a 
                      href="https://maps.app.goo.gl/THFJykgSy5m2Gkei9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="location-button"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </div>

                          <a 
                href={whatsappUrl}
                className="cta-button reveal-scale"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar Entradas
              </a>
              
              <div className="social-links reveal-up">
                <p>Seguinos en nuestras redes:</p>
                <div className="social-icons reveal-up">
                <a href="https://instagram.com/la_colmena_teatro" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                  <span>@la_colmena_teatro</span>
                </a>
                <a href="https://instagram.com/Quienpodria.laobra" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                  <span>@Quienpodria.laobra</span>
                </a>
                <a href="https://tiktok.com/@Quienpodria.laobra" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span>@Quienpodria.laobra</span>
                </a>
              </div>
            </div>
            
                          <a 
                href="https://youtu.be/sZP2ymgusBY"
                className="trailer-button reveal-scale"
                target="_blank"
                rel="noopener noreferrer"
              >
                🎬 Ver Trailer
              </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Quién Podría - La Colmena Teatro</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
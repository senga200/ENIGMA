
import '../styles/MagicIndiceCard.css';
import { useRef, useState, useEffect } from 'react';
import { getEnigmes } from '../utils/GetEnigmes';

function ReponseCardDashboard({ reponse = "Redécouvrir la réponse...", dateEnigme }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [indice, setIndice] = useState(null);

  const today = new Date().toISOString().slice(0, 10);
  const isToday = dateEnigme?.slice(0, 10) === today;

  useEffect(() => {
    async function fetchIndice() {
      if (isToday) {
        const all = await getEnigmes();
        const enigmeDuJour = all.find(e => e.date?.slice(0, 10) === today);
        setIndice(enigmeDuJour?.indice || "Aucun indice disponible.");
      }
    }
    fetchIndice();
  }, [isToday, dateEnigme]);

  const flipCard = () => {
    const card = cardRef.current;
    card.classList.add('card-flipping');
    if (!isFlipped) createMagicalStars(card);
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      card.classList.remove('card-flipping');
    }, 600);
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
      glowRef.current.style.opacity = 1;
    }
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = 0;
    }
  };

  const createMagicalStars = (cardElement) => {
    const particleCount = 15;
    const rect = cardElement.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const edge = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      let startX, startY;

      if (edge === 'horizontal') {
        startX = rect.left + Math.random() * rect.width;
        startY = rect.top;
      } else {
        startX = Math.random() < 0.5 ? rect.left : rect.right;
        startY = rect.top + Math.random() * rect.height;
      }

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 150 + 50;
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;

      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.position = 'fixed';
      particle.style.transform = `translate(0, 0)`;
      particle.style.opacity = 1;

      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(1.2)`;
        particle.style.opacity = 0;
      });

      setTimeout(() => {
        particle.remove();
      }, 1500);
    }
  };

  return (
    <div className="card-container">
      <div
        className="card-dashboard"
        ref={cardRef}
        onClick={flipCard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="glow" ref={glowRef}></div>

        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-front">
            <div className="card-pattern">
              <p className="click-to-reveal-dashboard">
                {isToday ? "Clique pour révéler l'indice" : "Clique pour voir la réponse"}
              </p>
            </div>
          </div>
          <div className="card-back">
            <div className="card-content">
              <p className="fortune-text-dashboard">
                {isToday ? indice : reponse}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReponseCardDashboard;

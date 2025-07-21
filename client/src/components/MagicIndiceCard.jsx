
import '../styles/MagicIndiceCard.css';
import { useRef, useState } from 'react';


function MagicIndiceCard({ indice = "Votre indice mystérieux apparaît ici..." }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);


  const flipCard = () => {
    const card = cardRef.current;
    
    card.classList.add('card-flipping');
    if (!isFlipped) createMagicalStars(card);

    setIsFlipped(!isFlipped);

    setTimeout(() => {
      card.classList.remove('card-flipping');
    }, 600);
  };
// glow effect mouse move et particules whow
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
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
        className="card"
        ref={cardRef}
        onClick={flipCard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="glow" ref={glowRef}></div>

        <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-front">
            <div className="card-pattern">
              <p className="click-to-reveal">Clique pour révéler l'indice</p>
            </div>
          </div>
          <div className="card-back">
            <div className="card-content">
              <p className="fortune-text">{indice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagicIndiceCard;

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '../utils/UserContext';
import '../styles/NavBar.css';
import '../styles/Background.css';

function NavBar({ isSwitched, handleToggle }) {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const lightRef = useRef(null);
  const linksRef = useRef([]);
  const [switchIsActive, setSwitchIsActive] = useState(false);

  const routes = [
    { to: '/dashboard', icon: 'bx-heart', label: 'Mes favoris' },
    { to: '/', icon: 'bx-home-alt-2', label: 'Accueil' },
    user && { to: '/profil', icon: 'bx-user', label: 'Mon Profil' },
    !user && { to: '/signin', icon: 'bx-lock', label: 'Connexion' },
    !user && { to: '/signup', icon: 'bx-edit', label: 'Inscription' },
  ].filter(Boolean);

  // Ajoute une fausse route logout pour l'effet visuel
  const fullRoutes = [
    ...routes,
    user && { to: '/logout', icon: 'bx-log-out', label: 'Déconnexion', action: 'logout' },
    { to: '/switch', icon: 'bx-night-light', label: 'Switch', isSwitch: true }
  ].filter(Boolean);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  useEffect(() => {
    // Si le switch n'est pas actif, on peut déplacer la lumière selon la route
    if (!switchIsActive) {
      const activeIndex = fullRoutes.findIndex((r) =>
        r.to === location.pathname || (r.action === 'logout' && location.pathname === '/logout')
      );
      
      //  setTimeout pour s'assurer que les éléments sont bien rendus
      setTimeout(() => {
        const el = linksRef.current[activeIndex];
        if (el && lightRef.current && activeIndex !== -1) {
          // Centrer la lumière sur l'icon
          const lightWidth = lightRef.current.offsetWidth;
          const elementCenter = el.offsetLeft + (el.offsetWidth / 2);
          const leftPosition = elementCenter - (lightWidth / 2);
          lightRef.current.style.left = `${leftPosition}px`;
        }
      }, 10);
    }
  }, [location.pathname, fullRoutes, switchIsActive]);

  const moveLightToIndex = (index) => {
    const el = linksRef.current[index];
    if (el && lightRef.current) {
      // Centrer la lumière sur l'icon
      const lightWidth = lightRef.current.offsetWidth;
      const elementCenter = el.offsetLeft + (el.offsetWidth / 2);
      const leftPosition = elementCenter - (lightWidth / 2);
      lightRef.current.style.left = `${leftPosition}px`;
    }
  };

  const handleSwitchClick = (e) => {
    e.preventDefault();
    handleToggle();
    
    const switchIndex = fullRoutes.findIndex((r) => r.isSwitch);
    moveLightToIndex(switchIndex);
    setSwitchIsActive(true);
  };

  const handleLinkClick = (route, index) => {
    // Réinitialise l'état du switch quand on clique sur un autre lien
    setSwitchIsActive(false);
    
    if (route.action === 'logout') {
      handleLogout();
    }
  };

  return (
    <nav className="nav">
      <ul className="nav__links">
        {fullRoutes.map((route, index) => (
          <li
            key={route.to}
            ref={(el) => (linksRef.current[index] = el)}
            className={`nav__link ${
              (location.pathname === route.to && !route.isSwitch && !switchIsActive) ||
              (route.isSwitch && switchIsActive)
                ? 'active'
                : ''
            }`}
            onClick={
              route.isSwitch
                ? handleSwitchClick
                : () => handleLinkClick(route, index)
            }
          >
            {route.isSwitch ? (
              <>
                <input
                  type="checkbox"
                  id="switch"
                  checked={isSwitched}
                  readOnly
                />
                <label htmlFor="switch" title="Switch Background">
                  <i className="bx bx-moon"></i>
                </label>
              </>
            ) : (
              <Link to={route.to}>
                <i className={`bx ${route.icon}`}></i>
              </Link>
            )}
          </li>
        ))}
        
        <div className="nav__light" ref={lightRef}></div>
      </ul>
    </nav>
  );
}

export default NavBar;
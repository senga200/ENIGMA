import{ useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import "../styles/NavBar.css";

function NavBar({ isSwitched, handleToggle }) {

  const {user, logout } = useUser();
  const navigate = useNavigate();
  const markerRef = useRef(null);
  const listRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(2);

  const navItems = [
    { icon: "home-outline", path: "/" },
    { icon: "heart-outline", path: "/dashboard" },
    { icon: "person-outline", path: "/profil" },
    {
      icon: user ? "log-out-outline" : "lock-closed-outline",
      path: user ? "/logout" : "/signin",
    },
    { icon: "contrast-outline" } 
  ];

  useEffect(() => {
    const marker = markerRef.current;
    const activeItem = listRefs.current[activeIndex];
    if (marker && activeItem) {
      marker.style.left = activeItem.offsetLeft + "px";
      marker.style.width = activeItem.offsetWidth + "px";
    }
  }, [activeIndex]);

  const handleMouseEnter = (index) => {
    const marker = markerRef.current;
    const item = listRefs.current[index];
    if (marker && item) {
      marker.style.left = item.offsetLeft + "px";
      marker.style.width = item.offsetWidth + "px";
    }
  };

  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <ul>
          {navItems.map((item, index) => {
            const isLogout = item.path === "/logout";
            const isSwitch = item.icon === "contrast-outline";

            return (
              <li
                key={index}
                ref={(el) => (listRefs.current[index] = el)}
                className={(activeIndex === index || 
                (item.icon === "contrast-outline" && isSwitched))
                ? "active": ""}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => {
                  if (isLogout) {
                    logout();
                    navigate("/signin");
                  } else if (!isSwitch) {
                    setActiveIndex(index);
                  }
                }}
              >
                {isLogout ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      navigate("/signin");
                    }}
                  >
                    <ion-icon name={item.icon}></ion-icon>
                  </a>
                ) : isSwitch ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggle();
                    }}
                    className={isSwitched ? "theme-on" : ""}
                  >
                    <ion-icon name={item.icon}></ion-icon>
                  </a>
                ) : (
                  <Link to={item.path}>
                    <ion-icon name={item.icon}></ion-icon>
                  </Link>
                )}
              </li>
            );
          })}
          <div id="marker" ref={markerRef}></div>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;

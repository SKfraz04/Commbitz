import styles from './style.module.css';
import NavBar from './NavBar';
import TopNaveBar from './TopNaveBar';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pagesToCheck = ["checkout", "document", "login"];
  const checkoutPage = pagesToCheck.some(page => location.pathname.split("/").includes(page));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

  
    useEffect(() => {
      if(!checkoutPage) {
        window.localStorage.removeItem("setDeviceDropDown")
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <header className={`${isMobile ? "mobile-header" : "desktop-header"} ${styles.headerMain} ff`}>
      <TopNaveBar />
      <NavBar />
    </header>
  );

};

export default Header;
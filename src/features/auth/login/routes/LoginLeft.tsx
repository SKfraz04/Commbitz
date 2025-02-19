import { Logo } from "../../../../assets/images";
import styles from '../styles/login.module.css';
import leftLogo  from "../../../../assets/images/logo.png"
import { Link } from "react-router-dom";

const LoginLeft = () => {
  return (
    <div className="col-md-6 p-0">
      <div className={styles.loginLeft}>
        <Link to="/"><img src={leftLogo} alt="logo" /></Link>
        
        <h3>International eSIM & Data cards</h3>
        <p>
          Enter your registered email and password to manage your Dashboard,
          track your Users, and enjoy benefits.
        </p>
      </div>
    </div>
  )
}

export default LoginLeft
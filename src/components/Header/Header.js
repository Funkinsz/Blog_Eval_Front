import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useContext, useState } from "react";
import MobileMenu from "./components/MobileMenu";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context";
import { signout } from "../../apis/auth";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const { user, signout } = useContext(AuthContext);
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className={`flex-fill`}>
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <ul className={`${styles.desktopHeader}`}>
        {user ? (
          <>
            <button className={`mr10 btn btn-primary`}>
              <i className="fas fa-star mr5"></i>
              <NavLink to="/profile" className={`${styles.white}`}>{user.pseudo}</NavLink>
            </button>
            <button className={`mr10 btn btn-primary-reverse`}>
              <i className="fas fa-star mr5"></i>
              <NavLink onClick={() => signout()} to='/login'>Logout</NavLink>
            </button>
          </>
        ) : (
          <>
            <button className={`mr10 btn btn-primary`}>
              <i className="fas fa-right-to-bracket mr5"></i>
              <NavLink to={`/register`}  className={`${styles.white}`}>Register</NavLink>
            </button>
            <button className={`mr10 btn btn-primary-reverse`}>
              <i className="fas fa-right-to-bracket mr5"></i>
              <NavLink to={`/login`}>Login</NavLink>
            </button>
          </>
        )}
      </ul>
      <i
        onClick={() => setShowMenu(true)}
        className={`${styles.mobileHeader} fas fa-bars mr10`}></i>
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <MobileMenu />
        </>
      )}
    </header>
  );
}

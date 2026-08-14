import {NavLink} from 'react-router-dom';

function NavBar() {
    return (
    <nav className="navbar">

      <NavLink to="/" end>Menu</NavLink>
      <NavLink to="/about">About</NavLink>

    </nav>
    )
};

export default NavBar;
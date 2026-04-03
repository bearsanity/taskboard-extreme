import { NavLink } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

function Nav() {
    const isLoggedIn = localStorage.getItem('token');

    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <NavLink to="/">Home</NavLink>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Sign Up</NavLink>
                </>
            )}
        </nav>
    );
};

export default Nav;
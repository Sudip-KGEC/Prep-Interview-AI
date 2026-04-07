import { Link, NavLink, useNavigate  } from "react-router";
import "./Navbar.scss";


const navItems = [
  { name: "Home", path: "/" },
  { name: "AI Interview Plan", path: "/interview-plan" },
  { name: "E-Book Store", path: "/ebooks" },
  { name: "Internships", path: "/internships" },
  { name: "Tech Blogs", path: "/blogs" },
  { name: "Codewar AI", path: "/codewar", comingSoon: true },
];

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      
      {/* 🔹 Logo */}
      <div className="navbar__logo">
        <Link to="/">CodePrep AI</Link>
      </div>

      {/* 🔹 Links */}
      <div className="navbar__links">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "navbar__link active" : "navbar__link"
            }
          >
            {item.name}
            {item.comingSoon && (
              <span className="soon">(Soon)</span>
            )}
          </NavLink>
        ))}
      </div>

      {/* 🔹 Profile */}
      <div className="navbar__profile">
        <button className="login-btn" onClick={()=> navigate("/login")}>Login</button>

        <div className="avatar">U</div>
      </div>
    </nav>
  );
}
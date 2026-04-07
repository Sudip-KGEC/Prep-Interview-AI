import { Link } from "react-router";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      
      {/* 🔹 Top Section */}
      <div className="footer__top">
        
        {/* Logo + Description */}
        <div className="footer__brand">
          <h2>CodePrep AI</h2>
          <p>
            Your AI-powered platform for interview preparation, ATS resumes,
            and placement success.
          </p>
        </div>

        {/* Links */}
        <div className="footer__links">
          <div>
            <h4>Platform</h4>
            <Link to="/">Home</Link>
            <Link to="/interview-plan">AI Interview Plan</Link>
            <Link to="/ebooks">E-Book Store</Link>
          </div>

          <div>
            <h4>Resources</h4>
            <Link to="/blogs">Tech Blogs</Link>
            <Link to="/internships">Internships</Link>
            <Link to="/codewar">Codewar AI</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} CodePrep AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-link"><Link to="/" className="nav-link-text">На главную</Link></div>
                <div className="nav-link"><Link to="/search" className="nav-link-text">Поиск</Link></div>
            </nav>
        </header>
    );
}

export default Header;
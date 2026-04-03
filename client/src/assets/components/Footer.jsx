import { Link } from 'react-router-dom';


function Footer() {
    return (
        <footer>
            <div className="footer-links">
                <a href='https://github.com/bearsanity' target="_blank" rel="noopener noreferrer"> Github </a>
                <a href='https://www.linkedin.com/in/james-sweeney-304905206/' target="_blank" rel="noopener noreferrer"> LinkedIn </a>
            </div>
            <p className="footer-text">&copy; 2026 James Sweeney. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
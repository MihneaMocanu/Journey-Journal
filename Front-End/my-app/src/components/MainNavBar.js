import "./MainNavBar.css"
import { Link } from "react-router-dom";

const MainNavBar = () => {
    return (
            <header>
                <div className="container">
                    <nav>
                        <Link to="/" className="logo">
                            <h2> <span>J</span>ourney<span>J</span>ournal</h2>
                        </Link>
                        <ul>
                            <li> 
                                <Link to="/public" className="nav-link">
                                    Experiences
                                </Link>
                            </li>
                            <Link to="/newPost" className="nav-link">
                                New Post
                            </Link>
                            <li>
                                <Link to="/private" className="nav-link">
                                    My Experiences
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
};

export default MainNavBar;
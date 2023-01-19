import "./MainNavBar.css"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const MainNavBar = () => {
    const idUser = useSelector((state) => state.idUser);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    return (
        <header>
            <div className="container-nav">
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
                        <li>
                            <form className="form-navbar">
                                <input type="text" className="input-navbar" placeholder="Search..." />
                                <button type="submit" className="button-navbar">Search</button>
                            </form>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <Link to="/newPost" className="nav-link">
                                    New Post
                                </Link>
                                <li>
                                    <Link to="/private" className="nav-link">
                                        My Experiences
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/account" className="nav-link">
                                        Account
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default MainNavBar;

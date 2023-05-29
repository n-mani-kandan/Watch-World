import  "../css/Header.css";
import { Link } from "react-router-dom";

const Navibar = ({ size, setShow }) => {
  return (
    <>
      {["lg"].map((expand) => (
        <nav className="navbar navbar-expand-md sticky-top  container-fluid header">
          <Link to="/" className="fruit_basket">
            Watch World
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
           >
            <div className="navbar-nav">
              <a
                className="nav-item nav-link active content"
                href="#"
                onClick={() => setShow(true)}
              >
                <Link to="/products" className="link">
                <i className="fas fa-search"></i> Products
                </Link>
                
              </a>
              <a className="nav-item nav-link content active" href="#">
              <Link to="/home" className="link">
                Home
                </Link>
                              </a>
              <a className="nav-item nav-link content active" href="#">
              <Link to="#" className="link">Help</Link>
              </a>
              <Link to="/" className="link">
              <a className="nav-item nav-link content active" href="#">
                <i className="fas fa-user-alt"></i> Hello
              </a>
              </Link>

              <a
                className="nav-item nav-link content active"
                href="#"
                onClick={() => setShow(false)}
              >
                
                <Link className="link " to="/cart">
                <i className="fas fa-cart-plus"></i>{" "}
                  Cart {size}
                </Link>
              </a>
            </div>
          </div>
        </nav>
      ))}
    </>
  );
};

export default Navibar;

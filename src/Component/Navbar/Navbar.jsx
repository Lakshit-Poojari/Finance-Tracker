import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RoleToggle from '../RoleToggle/RoleToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import "../Navbar/Navbar.css"
import { FaUser } from "react-icons/fa";

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          FinanceTracker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Left side links */}
          <Nav className="me-auto nav-links">
            <Nav.Link as={Link} to="/" className="nav-link">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/transaction" className="nav-link">Transactions</Nav.Link>
          </Nav>

          {/* Right side controls */}
          <div className="right-section d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3 mt-3 mt-lg-0">
            <RoleToggle />

            <Nav>
              <Nav.Link className="user-icon"><FaUser /></Nav.Link>
            </Nav>

            <ThemeToggle />
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
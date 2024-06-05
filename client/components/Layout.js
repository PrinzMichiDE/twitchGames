// components/Layout.js
import { Navbar, Nav } from 'react-bootstrap';

const Layout = ({ children }) => (
  <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Overview</Nav.Link>
          <Nav.Link href="/dashboard/profile">Profile</Nav.Link>
          <Nav.Link href="/dashboard/channel">Channel</Nav.Link>
          <Nav.Link href="/dashboard/subscribers">Subscribers</Nav.Link>
          <Nav.Link href="/dashboard/followers">Followers</Nav.Link>
          <Nav.Link href="/dashboard/bits">Bits</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="container mt-3">
      {children}
    </div>
  </>
);

export default Layout;

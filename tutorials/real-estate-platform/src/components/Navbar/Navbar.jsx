import "./Navbar.scss"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><img className="logo1" src="/images/housing-logo.jpg" alt="logo" /></div>
      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

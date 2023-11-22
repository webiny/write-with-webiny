import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;

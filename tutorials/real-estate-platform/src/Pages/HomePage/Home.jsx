import "./Home.scss";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <div className="container">
        <div className="content-section">
          <div className="background-logo">
            <img className="logo2" src="/images/housing-logo.jpg" alt="logo" />
          </div>
          <h1>The main Line or Philly?</h1>
          <div className="btns">
            <button>
              <Link className="btn-f" to="/flats-section">
                Search Homes
              </Link>
            </button>{" "}
            <button>
              <Link className="btn-f" to="/luxury-section">
                Search other properties
              </Link>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

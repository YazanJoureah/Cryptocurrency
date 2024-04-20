import { Routes, Route, Link } from "react-router-dom";
import { Menu } from "./Context/MenueContext";
import { Window } from "./Context/WindowContext";
import {
  News,
  Homepage,
  CryptoDetails,
  Exchanges,
  Cryptocurrencies,
} from "./pages";
import "./App.css";
import { Layout } from "antd";
import { useContext } from "react";
import TopBar from "./Components/Bars/TopBar/Topbar";
import SideBar from "./Components/Bars/SideBar/SideBar";

import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";

function App() {
  const menu = useContext(Menu);
  const window = useContext(Window);
  const size = window.windowSize;
  const isOpen = menu.isOpen;
  return (
    <div
      className="app"
      style={{
        flexDirection: size >= 768 ? "row" : "column",
      }}
    >
      {size >= 768 ? (
        <div
          className="Navbar bg-dark"
          style={{ width: isOpen ? "300px" : "60px" }}
        >
          <SideBar />
        </div>
      ) : (
        <div>
          <TopBar />
        </div>
      )}

      <div
        className="main "
        style={{
          paddingLeft: size >= 768 ? (isOpen ? "300px" : "60px") : "0px",
        }}
      >
        <Layout className="Layout">
          <div className="routs">
            <Routes>
              <Route element={<Homepage />} path="/"></Route>
              <Route element={<Exchanges />} path="/exchanges"></Route>
              <Route
                element={<Cryptocurrencies />}
                path="/cryptocurrencies"
              ></Route>
              <Route element={<CryptoDetails />} path="/crypto/:coinId"></Route>
              <Route element={<News />} path="/news"></Route>
            </Routes>
          </div>
        </Layout>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-row">
              <div className="footer-col">
                <h4>Cryprcurrency</h4>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/news">News</Link>
                  </li>
                  <li>
                    <Link to="/exchanges">Exchanges</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>company</h4>
                <ul>
                  <li>
                    <a href="#">about us</a>
                  </li>
                  <li>
                    <a href="#">our services</a>
                  </li>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>get help</h4>
                <ul>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                  <a href="#">
                    <i className="fab ">
                      <FacebookFilled />
                    </i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter">
                      <TwitterSquareFilled />
                    </i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram">
                      <InstagramFilled />
                    </i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in">
                      <LinkedinFilled />
                    </i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

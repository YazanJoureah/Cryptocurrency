import { Routes, Route, Link } from "react-router-dom";
import { Menu } from "./Context/MenueContext";
import { Window } from "./Context/WindowContext";
import {
  SideBar,
  News,
  Homepage,
  CryptoDetails,
  Exchanges,
  Cryptocurrencies,
} from "./Components";
import "./App.css";
import { Layout, Space, Typography } from "antd";
import { useContext } from "react";
import TopBar from "./Components/Topbar";

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

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse
            <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;

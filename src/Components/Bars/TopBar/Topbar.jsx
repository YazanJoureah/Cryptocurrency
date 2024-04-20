import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "../Bars.css";

function TopBar() {
  return (
    <>
      <Navbar
        className="Bar"
        collapseOnSelect
        sticky="top"
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand className="mainTitle  fs-3">Cryptoverse</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/"} className="side-bar-link align-items-center">
                <HomeOutlined />
                <span>Home</span>
              </NavLink>
              <NavLink
                to={"/cryptocurrencies"}
                className="side-bar-link align-items-center"
              >
                <FundOutlined />
                <span>Cryptocurrencies</span>
              </NavLink>

              <NavLink
                to={"/news"}
                className="side-bar-link align-items-center"
              >
                <BulbOutlined />
                <span>News</span>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;

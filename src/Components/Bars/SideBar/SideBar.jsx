import { NavLink } from "react-router-dom";
import { Menu } from "../../../Context/MenueContext";
import { Stack } from "react-bootstrap";
import {
  BarsOutlined,
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import "../Bars.css";

function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const setIsOpen = menu.setIsOpen;

  let handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="Bar">
      <div className="logo-container p-3 d-flex ">
        <span
          className="mainTitle  fs-3"
          style={{ display: isOpen ? "block" : "none" }}
        >
          Cryptoverse
        </span>
        <BarsOutlined onClick={handleClick} className="Bars" />
      </div>

      <Stack gap={2}>
        <NavLink to={"/"} className="side-bar-link align-items-center">
          <HomeOutlined />
          <span style={{ display: isOpen ? "block" : "none" }}>Home</span>
        </NavLink>
        <NavLink
          to={"/cryptocurrencies"}
          className="side-bar-link align-items-center"
        >
          <FundOutlined />
          <span style={{ display: isOpen ? "block" : "none" }}>
            Cryptocurrencies
          </span>
        </NavLink>

        <NavLink to={"/news"} className="side-bar-link align-items-center">
          <BulbOutlined />
          <span style={{ display: isOpen ? "block" : "none" }}>News</span>
        </NavLink>
      </Stack>
    </div>
  );
}

export default SideBar;

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import logo from "./logo.png"

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
`
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `

  function LoginSidebar() {
    const menus = [
      { name: "로그인", path: "/" },
    ];
    return (
      <Side>
        <Logo src={logo}></Logo>
        <Menu>
          {menus.map((menu, index) => {
            return (
              <NavLink
                exact
                to={menu.path}
                key={index}
              >
                <SidebarItem
                  menu={menu}
                />
              </NavLink>
            );
          })}
        </Menu>
      </Side>
    );
  }

  export default LoginSidebar;
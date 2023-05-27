import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import driver from "./driver.png";
import { useSelector } from 'react-redux';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.h6`
  display: flex;
  align-items: center;
  font-size: 25px;
  padding-left: 15px;
  padding-top: 10px;
`

const UserImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

function GuardianSidebar() {
  const menus = [
    { name: "보호자 픽업", path: "/Pickup" }
  ];
  const user_name = useSelector((state => state.user_name))

  return (
    <Side>
      <Header>
        <UserImage src={driver} alt="Driver"  />
        보호자 {user_name}님
      </Header>
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

export default GuardianSidebar;

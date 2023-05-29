import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import home from "./home.png";
import baby from "./baby.png";
import { useSelector } from 'react-redux';
import "./sidebar.css";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #f9f9f7;
  display: flex;
  justify-content: center;
  color: #666666;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 10px;
`;

const Button = styled(NavLink)`
  text-decoration: none;
  color: #ffffff;
  font-size: 20px;
  padding: 5px 5px;
  margin-top: 5px;
  text-align: center;
  color: #666666;
  border-top: 1px #666666;

  &.active {
    color: #6666666;
  }
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

const SidebarItem = ({ menu }) => {
  return (
    <>
      {menu.name === "메인 페이지" && <Icon src={home} alt="Home" />}
      {menu.name === "학생 픽업" && <Icon src={baby} alt="Baby" />}
      {menu.name === "긴급 연락" && <Icon src={baby} alt="Baby" />}
      {menu.name}
    </>
  );
};

function AdminBottomNav() {
  const menus = [
    { name: "메인 페이지", path: "/ParentMain" },
    { name: "학생 픽업", path: "/Pickup" },
    { name: "긴급 연락", path: "/TelephoneLink" }
  ];
  const user_name = useSelector((state) => state.user_name);

  return (
    <Container>
      <Box className="bottom-button">
        <Button exact to={menus[0].path}>
          <SidebarItem menu={menus[0]} />
        </Button>
      </Box>
      <Box className="bottom-button">
        <Button exact to={menus[1].path}>
          <SidebarItem menu={menus[1]} />
        </Button>
      </Box>
      <Box className="bottom-button">
        <Button exact to={menus[2].path}>
          <SidebarItem menu={menus[2]} />
        </Button>
      </Box>
    </Container>
  );
}

export default AdminBottomNav;

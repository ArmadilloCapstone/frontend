import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import home from "./home.png";
import baby from "./baby.png";
import phone from "./phone.png";
import note2 from "./note2.png";
import camera2 from "./camera2.png";
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
  margin-right: -8px;
  margin-left: -8px;
`;

const SidebarItem = ({ menu }) => {
  return (
    <>
      {menu.name === "메인" && <Icon src={home} alt="Home" />}
      {menu.name === "픽업" && <Icon src={baby} alt="Baby" />}
      {menu.name === "긴급" && <Icon src={phone} alt="Phone" />}

      {menu.name === "안내장" && <Icon src={note2} alt="Note" />}
      {menu.name === "사진첩" && <Icon src={camera2} alt="Camera" />}
    </>
  );
};

function AdminBottomNav() {
  const menus = [
    { name: "메인", path: "/ParentMain" },
    { name: "픽업", path: "/Pickup" },
    { name: "긴급", path: "/TelephoneLink" },

    { name: "안내장", path: "/ParentBbsList" },
    { name: "사진첩", path: "/ParentGalleryList" }
  ];
  const user_name = useSelector((state) => state.user_name);

  return (
    <Container >
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
      <Box className="bottom-button">
        <Button exact to={menus[3].path}>
          <SidebarItem menu={menus[3]} />
        </Button>
      </Box>

      <Box className="bottom-button">
        <Button exact to={menus[4].path}>
          <SidebarItem menu={menus[4]} />
        </Button>
      </Box>

    </Container>
  );
}

export default AdminBottomNav;

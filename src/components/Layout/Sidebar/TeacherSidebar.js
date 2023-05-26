import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import logo from "./logo.png";
import block from "./block.png";
import { useSelector } from 'react-redux';

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
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

  function TeacherSidebar() {
    const menus = [
      { name: "출결 관리", path: "/TimelinePage" },
      { name: "학생 관리", path: "/StudentState" },
      { name: "보호자 관리", path: "/GuardianManagementPage" },
      { name: "안내장", path: "/BbsList" },
      { name: "사진첩", path: "/GalleryList" }


      // pickup
    ];
    const user_name = useSelector((state => state.user_name))
    return (
      <Side>
        <Logo src={logo}></Logo>
        <h6 style={{fontSize: "25px", paddingLeft: "15px", paddingTop:"10px"}}>돌봄교사 {user_name}님</h6>
        <Menu>
          {menus.map((menu, index) => {
            return (
              <NavLink
                exact
                style={({ isActive }) => ({color: isActive ? "black" : "gray"
                                          , textDecoration: isActive ? "underline" : "none"})}
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

  export default TeacherSidebar;
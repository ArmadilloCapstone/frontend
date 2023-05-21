import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import logo from "./logo.png"
import { useSelector } from 'react-redux';

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Logo = styled.img`
  width: 150px;
  height: 150px;
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
      { name: "보호자 관리", path: "/guardian" },
      { name: "안내장", path: "/invitation" },
      { name: "사진첩", path: "/gallery" },
      { name: "간식 관리", path: "/snack" },


      // pickup
    ];
    const user_name = useSelector((state => state.user_name))
    return (
      <Side>
        <Logo src={logo}></Logo>
        <h6>돌봄교사 {user_name}님</h6>
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
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import logo from "./logo.jpg"

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
`
const Logo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `

  function AdminSidebar() {
    const menus = [
      { name: "사용자 추가", path: "/Temp" },
      { name: "돌봄학급 관리", path: "/ClassManagementPage" },
      { name: "돌봄교사 관리", path: "/TeacherManagementPage" },
      { name: "학생 관리", path: "/StudentManagementPage" },
      { name: "재무 관리", path: "/BudgetManagementPage" }
    ];
    return (
      <Side>
        <Logo src={logo}></Logo>
        <h6>관리자 OOO님</h6>
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

  export default AdminSidebar;
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
      { name: "돌봄학생 관리", path: "/StudentManagementPage" },
      { name: "학부모 관리", path: "/ParentManagementPage" },
      { name: "방과후수업 관리", path: "/AfterClassManagementPage" },
      { name: "학생 입퇴실시간 관리", path: "/StudentTimeManagementPage" },
      { name: "학생 시간표 관리", path: "/StudentScheduleManagementPage" },


      { name: "안내장", path: "/bbslist" }

    ];
    return (
      <Side>
        <Logo src={logo}></Logo>
        <h6>관리자님</h6>
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
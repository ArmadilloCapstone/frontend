import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import TeacherSidebarItem from "./TeacherSidebarItem";
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

  function TeacherSidebar() {
    const menus = [
      { name: "메인 페이지", path: "/" },
      { name: "출결 관리", path: "/TimelinePage" },
      { name: "학생 관리", path: "/StudentState" },
      { name: "보호자 관리", path: "/guardian" },
      // { name: "메신저", path: "/messanger" },
      { name: "안내장", path: "/invitation" },
      { name: "사진첩", path: "/gallery" },
      { name: "간식 관리", path: "/snack" },
      // { name: "예산 관리", path: "/budget" },
      { name: "사용자 추가(임시)", path: "/EntireUserAddPage" },
      { name: "돌봄학급 관리", path: "/ClassManagementPage" },
      { name: "돌봄교사 관리", path: "/TeacherManagementPage" },
      { name: "돌봄학생 관리", path: "/StudentManagementPage" },
      { name: "학부모 관리", path: "/ParentManagementPage" }
      // { name: "재무 관리", path: "/budget" }
    ];
    return (
      <Side>
        <Logo src={logo}></Logo>
        <h6>교사 OOO님</h6>
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
                <TeacherSidebarItem
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
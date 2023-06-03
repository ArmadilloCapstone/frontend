import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import logo from "./logo.png";
import name from "./name.png";
import teacher from "./teacher.png";
import block from "./block.png";
import book from "./book.png";
import user from "./user.png";
import note from "./note.png";
import chat from "./chat.png";

import camera from "./camera.png";
import { useSelector } from 'react-redux';
import "./sidebar.css";

const Side = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding-top: 20px;
`
const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-left: 23px;
`;

const Name = styled.img`
  width: 100px;
  height: 40px;
  margin-left: ;
`;

const Menu = styled.div`
margin-top: 30px;
padding-bottom: 20px;
width: 200px;
display: flex;
flex-direction: column;
`

const TabButton = styled.button`
  background-color: #12B560;
  border: none;
  width: 200px;
  padding-left: 10px;
  padding-bottom: 25px;
  text-align: left;
  align-items: center;
  color: white;
  font-size: 15px;

  &:hover {
    color: #EBECF0;
  }
`;

const BlockIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const TeacherIcon = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 1px;
`;

const SidebarUser = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
  border: none;
  border-radius: 27px;
  color: #555555;
  width: 200px;
  height: 80px;
`;

const Line = styled.div`
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

  function TeacherSidebar() {
    const menus = [
      { name: "출결 관리", path: "/TimelinePage" ,icon: book },
      { name: "학생 관리", path: "/StudentState",icon: user },
      { name: "보호자 관리", path: "/GuardianManagement",icon: block },
      { name: "안내장", path: "/BbsList",icon: note },
      { name: "사진첩", path: "/GalleryList",icon: camera },
      { name: "메신저", path: "/Message",icon: chat }
    ];

    const user_name = useSelector((state => state.user_name))

    return (
      <Side>
        <div>
          <Logo src={logo} />
          <Name src={name} />
        </div>
      <div className="sidebar-container">
          <SidebarUser>
            <TeacherIcon src={teacher} />
            <h6 style={{ fontSize: "20px", paddingLeft: "5px", paddingTop: "10px" }}>{user_name} 교사님</h6>
          </SidebarUser>
        <Menu className="sidebar-content">
          {menus.map((menu, index) => {
            return (
              <StyledNavLink
                exact
                to={menu.path}
                key={index}
                activeClassName="active"
              >

                  <TabButton>
                    <BlockIcon src={menu.icon ? menu.icon : block} />
                    {menu.name}
                  </TabButton>

                {menu.name === "보호자 관리" && (
                  <Line className="sidebar-line"/>
                )}
              </StyledNavLink>
            );
          })}
        </Menu>
      </div>
    </Side>
  );

  }

  export default TeacherSidebar;
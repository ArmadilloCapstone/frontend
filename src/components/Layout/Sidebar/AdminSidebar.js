import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import logo from "./logo.png";
import manager from "./manager.png";
import block from "./block.png";
import book from "./book.png";
import user from "./user.png";
import alarm from "./alarm.png";
import school from "./school.png";
import "./sidebar.css";

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 20px;
`;

const Logo = styled.img`
  width: 170px;
  height: 170px;
  margin-bottom: 30px;
  margin-left: 40px;
`;

const Menu = styled.div`
  margin-top: 30px;
  padding-bottom: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

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

const ManagerIcon = styled.img`
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

function AdminSidebar() {
  const menus = [
    { name: "사용자 추가", path: "/Temp" },
    { name: "돌봄학급 관리", path: "/ClassManagementPage", icon: school },
    { name: "돌봄교사 관리", path: "/TeacherManagementPage", icon: user },
    { name: "돌봄학생 관리", path: "/StudentManagementPage", icon: user },
    { name: "학부모 관리", path: "/ParentManagementPage", icon: user },
    { name: "방과후수업 관리", path: "/AfterClassManagementPage", icon: book },
    { name: "학생 출입시간", path: "/StudentTimeManagementPage" },
    { name: "학생 시간표", path: "/StudentScheduleManagementPage", icon: alarm }
  ];

  return (
    <Side>
      <Logo src={logo} />
      <div className="sidebar-container">
        <MenuItem>
          <SidebarUser>
            <ManagerIcon src={manager} />
            <h6 style={{ fontSize: "25px", paddingLeft: "15px", paddingTop: "10px" }}>관리자님</h6>
          </SidebarUser>
        </MenuItem>
        <Menu className="sidebar-content">
          {menus.map((menu, index) => {
            return (
              <StyledNavLink
                exact
                to={menu.path}
                key={index}
                activeClassName="active"
              >
                <MenuItem>
                  <TabButton>
                    <BlockIcon src={menu.icon ? menu.icon : block} />
                    {menu.name}
                  </TabButton>
                </MenuItem>
                {menu.name === "방과후수업 관리" && (
                  <Line  className="sidebar-line"/>
                )}
              </StyledNavLink>
            );
          })}
        </Menu>
      </div>
    </Side>
  );
}

export default AdminSidebar;

import React from "react";
import LoginSidebar from "./LoginSidebar";
import TeacherSidebar from "./TeacherSidebar";
import ParentSidebar from "./ParentSidebar";
import GuardianSidebar from "./GuardianSidebar";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from 'react-redux';

  function Sidebar() {

    const user_option = useSelector((state => state.user_option))


    return (
        <div>
        {
            (user_option == "")
            ?
            <LoginSidebar/>
            :
            null
        }
        {
            (user_option == 1)
            ?
            <TeacherSidebar/>
            :
            null
        }
        {
            (user_option == 2)?
            <ParentSidebar/>
            :
            null
        }
        {
            (user_option == 4)?
            <AdminSidebar/>
            :
            null
        }
        </div>
    );
  }

  export default Sidebar;
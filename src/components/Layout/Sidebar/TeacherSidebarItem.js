import React from "react";

function TeacherSidebarItem({ menu }) {
  return (
    <div className="sidebar-item">
      <p>{menu.name}</p>
    </div>
  );
}

export default TeacherSidebarItem;
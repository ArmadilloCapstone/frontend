import React from "react";

function AdminSidebarItem({ menu }) {
  return (
    <div className="sidebar-item">
      <p>{menu.name}</p>
    </div>
  );
}

export default AdminSidebarItem;
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AddItems, ListItems, notify, OrderItems } from "../components";
import { useDispatch } from "react-redux";
import { adminLogout } from "../store/authSlice";

const Admin = () => {
  const location = useLocation(); // To access the current URL
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To programmatically navigate

  // Determine the active component based on the URL
  const renderComponent = () => {
    switch (location.pathname) {
      case "/admin/v1/add-items":
        return <AddItems />;
      case "/admin/v1/list-items":
        return <ListItems />;
      case "/admin/v1/order-items":
        return <OrderItems />;
      default:
        return null;
    }
  };

  const handleLogout = () => {

    notify('Admin logged out successfully')
    dispatch(adminLogout())

  }

  return (
    <div>
      {/* Header */}
      <div className="border pb-[1%] justify-between flex py-5">
        <div className="pl-[10%]">
          <p className="text-3xl text-gray-500">MERNWare</p>
          <p className="text-pink-400">Admin Panel</p>
        </div>
        <div className="pr-[6%] mt-2">
          <NavLink to="/admin/login">
            <button 
            onClick={handleLogout}
            className="bg-gray-600 text-white px-7 py-2 rounded-3xl">
              Logout
            </button>
          </NavLink>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="border min-h-screen w-[25%]">
          <div className="pl-[20%] my-8 ">
            <button
              onClick={() => navigate("/admin/v1/add-items")}
              className={`flex gap-5 border rounded-lg py-2 mb-4  pl-5 items-center w-full ${
                location.pathname === "/admin/v1/add-items" ? "bg-gray-300" : ""
              }`}
            >
              Add Items
            </button>
            <button
              onClick={() => navigate("/admin/v1/list-items")}
              className={`flex gap-5 border rounded-lg py-2 mb-4 pl-5 items-center w-full ${
                location.pathname === "/admin/v1/list-items" ? "bg-gray-300" : ""
              }`}
            >
              List Items
            </button>
            <button
              onClick={() => navigate("/admin/v1/order-items")}
              className={`flex gap-5 border rounded-lg py-2 mb-4 pl-5 items-center w-full ${
                location.pathname === "/admin/v1/order-items" ? "bg-gray-300" : ""
              }`}
            >
              Order Items
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full min-h-full">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Admin;

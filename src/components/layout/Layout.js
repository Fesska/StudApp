import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../ui/navbar/Navbar";
import { SLayout, SMain } from "./style";

const Layout = () => {
  return (
    <SLayout>
      <Navbar />
      <SMain>
        <Outlet />
      </SMain>
    </SLayout>
  );
};

export default Layout;

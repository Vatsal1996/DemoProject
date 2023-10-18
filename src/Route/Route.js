import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDirectory from "../Pages/UserDirectory/UserDirectory";
import UserDetails from "../Pages/UserDetails/UserDetails";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDirectory />} />
        <Route path="/UserInfo" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

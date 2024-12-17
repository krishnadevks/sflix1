import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/adminpage/AdminPage";
import VideoPlayer from "../src/components/admincomp/trielplay";
import Dashboard from "./components/admincomp/Dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/p" element={<VideoPlayer />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/home" element={<h1>Home Page</h1>} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import VideoUpload from "../admincomp/VideoUpload";
import VideoPlayer from "../admincomp/VideoPlayer";
import UserTable from "./UserTable";
import "./AdminPage.css";
import Dashboard from "../admincomp/Dashboard";
import MovieLibrary from "../admincomp/MovieLibrary";
import Analytics from "../admincomp/Analytics";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/movies" element={<MovieLibrary />} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="users" element={<UserTable />} />
          <Route path="upload" element={<VideoUpload />} />
          <Route path="player" element={<VideoPlayer />} />
        </Routes>
        {/* <VideoUpload onVideoUpload={handleVideoUpload} /> */}
        {/* <VideoPlayer selectedVideo={selectedVideo} /> */}
      </div>
    </div>
  );
};

export default AdminPage;

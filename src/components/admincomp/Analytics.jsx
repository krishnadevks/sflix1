import React from 'react';
import Navbar from '../admincomp/Navbar';
import Sidebar from '../admincomp/Sidebar';
import AnalyticsPanel from '../admincomp/AnalyticsPanel';

const Analytics = () => {
  return (
    <div className="analytics">
      <Navbar />
      <Sidebar />
      <div className="content">
        <h1>Analytics</h1>
        <AnalyticsPanel />
      </div>
    </div>
  );
};

export default Analytics;

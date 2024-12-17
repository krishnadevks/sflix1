import React from 'react';
import Graph from './Graph';

const AnalyticsPanel = () => {
  return (
    <div className="analytics-panel">
      <div className="analytics-card">
        <h3>Daily Active Users</h3>
        <Graph type="line" data={[10, 20, 30, 40]} />
      </div>
      <div className="analytics-card">
        <h3>Viewership Trends</h3>
        <Graph type="bar" data={[5, 15, 25, 35]} />
      </div>
    </div>
  );
};

export default AnalyticsPanel;

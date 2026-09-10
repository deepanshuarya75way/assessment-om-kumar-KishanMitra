import React, { useState, useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

const History = () => {
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/activities`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter out login, logout, and resent email activities
        const filteredActivities = res.data.filter(activity => 
          !['Logged in', 'Logged out', 'Resent verification email'].includes(activity.action)
        );
        setActivities(filteredActivities);
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    };
    if (token) fetchActivities();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Activity History</h1>
      {activities.length > 0 ? (
        <ul className="list-disc pl-5">
          {activities.map((activity, index) => (
            <li key={index} className="py-2">
              {activity.action} - {new Date(activity.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities to display (excluding login, logout, and resent email).</p>
      )}
    </div>
  );
};

export default History;
import React from "react";
import Profile from "../components/dashboard/Profile";
import History from "../components/dashboard/History";
import Scheduler from "../components/dashboard/Scheduler";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold font-serif text-center text-green-800 mt-20"> KishanMitra Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left Side - Profile */}
        
        <div className="md:w-1/3 ">
          <Profile />
        </div>

        {/* Right Side - History */}
        <div className="md:w-2/3 w-full">
          <History />
        </div>
      </div>

      <div className="md:mt-5">
     <Scheduler/>

      </div>
     
     
    </div>
  );
}

export default Dashboard;
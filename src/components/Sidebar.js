import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiSettings } from "react-icons/ci";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { IoGitNetworkSharp } from "react-icons/io5";
import { BsArrowLeftRight, BsPeople, BsFillLightningChargeFill } from "react-icons/bs";
import { RiChat1Line } from "react-icons/ri";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-400 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BsFillLightningChargeFill className="mr-2 text-purple-600" />
        Superpage
      </h2>
      <nav className="flex flex-col space-y-2">
        {/* Load active conversation */}
        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) =>
            `flex items-center hover:bg-gray-600 p-2 rounded ${isActive ? 'bg-gray-600' : ''}`
          }
        >
          <RiChat1Line className="mr-2" /> AI Chat
        </NavLink>

        {/* Static sidebar */}
        <div className="flex items-center p-2 rounded">
          <BsPeople className="mr-2" /> Members
        </div>
        <div className="flex items-center p-2 rounded">
          <BsArrowLeftRight className="mr-2" /> Integrations
        </div>
        <div className="flex items-center p-2 rounded">
          <IoGitNetworkSharp className="mr-2" /> Refer Friends
        </div>
        <div className="flex items-center p-2 rounded">
          <PiCurrencyDollarSimpleBold className="mr-2" /> Pricing Plans
        </div>
        <div className="flex items-center p-2 rounded">
          <CiSettings className="mr-2" /> Settings
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;

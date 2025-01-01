import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useAuthStore } from "../../store/authUser.js";
import useWorkspaceStore from "../../store/share.js"; // Correct import for workspace store
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dropStyles from "./dropdown";
import { useHomeStore } from "../../store/home.js";

const Dropdown = ({ username }) => {
  const [selectedOption, setOption] = useState(null);
  const { logout } = useAuthStore();
  const { fetchWorkspaces, fetchWorkspaceDetails, workspaces, getWorkspaceById } = useWorkspaceStore();
  const { fetchHome } = useHomeStore();
  const navigate = useNavigate();
  const us = username + "'s Workspace";

  // Fetch workspaces on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchWorkspaces(); // Fetch initial workspaces
        await fetchWorkspaceDetails(); // Fetch detailed workspace data
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        // toast.error("Failed to load workspaces.");
      }
    };

    fetchData();
  }, [fetchWorkspaces, fetchWorkspaceDetails]);

  // Transform workspaces into dropdown options
  const workspaceOptions = workspaces.map((workspace) => ({
    value: workspace.id,
    label: workspace.ownerUsername || "Unnamed Workspace", // Handle missing names
  }));

  // Default options
  const defaultOptions = [
   
    { value: "settings", label: "Settings" },
    { value: "logout", label: "Log Out" },
  ];
  const user = [
    { value: "username", label:`${us}`},
  ]

  const handleDropdownChange = async (option) => {
    setOption(option);

    if (option.value === "logout") {
      await logout();
      
    } else if (option.value === "settings") {
      navigate("/home/settings");
    } else if (option.value === "username") {
      // Fetch the home data when the "username" option is selected
      fetchHome();
    }
      else {
      const workspaceId = option.value;
      const selectedWorkspace = getWorkspaceById(workspaceId);
    }
  };

  return (
    <div className="dropdown">
      <Select
        options={[...user, ...workspaceOptions, ...defaultOptions]} // Combine options
        value={selectedOption}
        placeholder={`${username}'s Workspace`}
        onChange={handleDropdownChange}
        styles={dropStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default Dropdown;
